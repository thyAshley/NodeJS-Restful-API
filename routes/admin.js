const path = require("path");

const express = require("express");

const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/add-product",
  authController.protectMiddleware,
  adminController.getAddProduct
);

router.get("/products", adminController.getProducts);

router.post(
  "/add-product",
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
  authController.protectMiddleware,
  adminController.postEditProduct
);

router.post(
  "/delete-product",
  authController.protectMiddleware,
  adminController.postDeleteProduct
);

module.exports = router;
