const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { User } = require("../../services/db/db.js");

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:user_id", async (req, res) => {
  try {
    //separe por params y todos los users porque me parece que no funciona juntos
    if (req.params.user_id)
      res.status(200).json(await controller.getUserById(req.params.user_id));
    // else res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.sendStatus(400);
  }
});
// /users/3   body={surname:"beto",username:"pepe"}
router.put("/:user_id", validate.user, async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req.params;
    const usernameDb = await User.findByPk(user_id);
    if (
      usernameDb &&
      (usernameDb.username === req.username || req.role === 3) // permisos para modificar si es admin
    ) {
      res.status(200).send(await controller.modifyUser(user_id, data));
    } else {
      throw new Error("fallo x");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.put("/:user_id", async (req, res) => {
//   const { username, name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture } = req.body
//   const { user_id } = req.params;
//   const { userRole } = req.role;
//   const { userDb } = req.username

//   try {
//     if ( user_id === userDb) { // ES USER
//       let obj = { name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, profilePicture }
//       res.status(200).send(await controller.editByUser(user_id, obj))
//     }

//     if (userRole === 3) { // ES ADMIN
//       let obj = { username , name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture }
//       res.status(200).send(await controller.editByAdmin(user_id, obj))
//     }

//   } catch (error) {
//     throw new Error(error);

//   }
// })

module.exports = router;
