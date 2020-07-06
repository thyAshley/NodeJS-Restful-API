const express = require("express");

const productController = require("../controllers/productsController");

const router = express.Router();

router
  .route("/add-product")
  .get(productController.getAddProduct)
  .post(productController.postAddProduct);

exports.adminRoutes = router;
exports.products = productController.products;
