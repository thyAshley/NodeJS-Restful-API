const express = require("express");
const { check, body } = require("express-validator");

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
  .post(
    [
      check("email", "Please enter a valid email").isEmail(),
      body("password", "Please enter a valid password")
        .isLength({ min: 5 })
        .isAlphanumeric(),
      body("confirmPassword", "Password does not match").custom(
        (value, { req }) => {
          if (req.body.password === value) {
            return true;
          }
        }
      ),
    ],
    authController.postSignup
  );

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/reset-password", authController.postNewPassword);
module.exports = router;
