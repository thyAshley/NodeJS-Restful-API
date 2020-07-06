const express = require("express");
const path = require("path");

const rootDir = require("../util/path");
const { products } = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("shop", {
    pageTitle: "Home page",
    prods: products,
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

exports.shopRoutes = router;
