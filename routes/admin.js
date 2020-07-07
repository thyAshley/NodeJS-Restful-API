const express = require("express");

const adminController = require("../controllers/adminController");

const router = express.Router();

router
  .route("/add-products")
  .get(adminController.getAddProduct)
  .post(adminController.postAddProduct);

router.get("/products", adminController.getProduct);

exports.adminRoutes = router;
exports.products = adminController.products;
