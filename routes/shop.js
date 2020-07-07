const express = require("express");

const shopController = require("../controllers/shopController");

const router = express.Router();

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);

exports.shopRoutes = router;
