const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/add-product",
  authController.protectMiddleware,
  adminController.getAddProduct
);

router.get(
  "/products",
  authController.protectMiddleware,
  adminController.getProducts
);

router.post(
  "/add-product",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageURL", "Url must be valid").isURL().trim(),
    body("price").isNumeric().trim(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  authController.protectMiddleware,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  authController.protectMiddleware,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title").isAlphanumeric().isLength({ min: 3 }).trim(),
    body("imageURL", "Url must be valid").isURL().trim(),
    body("price").isNumeric().trim(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  authController.protectMiddleware,
  adminController.postEditProduct
);

router.post(
  "/delete-product",
  authController.protectMiddleware,
  adminController.postDeleteProduct
);

module.exports = router;
