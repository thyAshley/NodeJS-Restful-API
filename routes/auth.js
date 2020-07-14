const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
router
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

router.post("/logout", authController.postLogout);

router
  .route("/signup")
  .get(authController.getSignup)
  .post(authController.postSignup);

module.exports = router;
