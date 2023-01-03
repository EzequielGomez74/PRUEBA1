const { User } = require("../../services/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const emailer = require ("../../services/mailer/emailer.js")


async function handleNewUser(data) {
  if (!data.username || !data.password)
    throw new Error("Username and Password are required");
  //Buscar usernames duplicados en DB
  try {
    const duplicate = await User.findOne({ where: { username: data.username } });
    if (duplicate) throw new Error("Username already exist"); //409 = conflict
    //Encryptar el password        
    const hashedPwd = await bcrypt.hash(data.password, 10); //10 es la cantidad de SALT
    //Agregar el nuevo usuario en la DB nececita muchos mas datos para que respete el modelo. Atencion aca!
    const newUser = {
      username: data.username,
      name: data.name,
      surname: data.surname,
      password: hashedPwd,
      role: data.role,
      email: data.email,
      defaultShippingAddress: data.defaultShippingAddress,
      zipCode: data.zipCode,
      profilePicture: data.profilePicture,
    };
    // verificationNumber es el numero para validar el email
    let verificationNumber = require ("crypto").randomBytes(10).toString("hex")
    const userdata = {...newUser, type:"register", verificationNumber: verificationNumber}
    console.log("OBJETOOOO",userdata)
    emailer.sendMail(userdata)
    const userCreated = await User.create(newUser);
    return { success: `New user ${userCreated.username} created` };
  } catch (error) {
    throw new Error(error);
  }
}
async function handleLogin(username, password) {
  if (!username || !password)
  throw new Error("Username and Password are required");
  try {
    const foundUser = await User.findOne({ where: { username: username } });
    if (!foundUser) throw new Error("Unauthorized user"); //401 = unauthorized
    //evaluar password
    console.log("LLEGA");
    //const match = await bcrypt.compare(password, password);
    if (true) {
      //!! ACA HAY QUE CREAR EL JWT VALIDATOR TOKEN !! json web token (access token - refresh token)      
      const accessToken = jwt.sign(
        { username: foundUser.username, role: foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "600s" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1200s" }
      );
      //guardar el refreshToken en la DB
      foundUser.set({ refreshToken: refreshToken });
      await foundUser.save();
      
      return { accessToken, refreshToken };
    } else throw new Error("Wrong Password");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function handleLogout(cookie) {
  const foundUser = await User.findOne({ where: { refreshToken: cookie } });
  if (!foundUser) throw new Error("User not found");
  foundUser.refreshToken = "";
  foundUser.save();
}

module.exports = { handleLogin, handleNewUser, handleLogout };
