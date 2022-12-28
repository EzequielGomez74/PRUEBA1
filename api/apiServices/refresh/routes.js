const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();

router.get("/", async (req, res) => {
  console.log("Refresh Token ", req.cookies.jwt);
  const cookies = req.cookies?.jwt;
  try {
    if (cookies) {
      const accessToken = await controller.handleRefreshToken(cookies);
      if (accessToken) res.status(200).json({ accessToken });
      else res.sendStatus(402);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(401);
  }
});
module.exports = router;
