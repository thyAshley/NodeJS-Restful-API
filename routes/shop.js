const path = require("path");

const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.route("/cart").get(shopController.getCart).post(shopController.postCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
