const express = require("express");

const shopController = require("../controllers/shopController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router
  .route("/cart")
  .get(authController.protectMiddleware, shopController.getCart)
  .post(authController.protectMiddleware, shopController.postCart);

router.post(
  "/cart/delete-item",
  authController.protectMiddleware,
  shopController.postCartDeleteProduct
);

router.get(
  "/orders",
  authController.protectMiddleware,
  shopController.getOrders
);

router.post(
  "/create-order",
  authController.protectMiddleware,
  shopController.postOrder
);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
