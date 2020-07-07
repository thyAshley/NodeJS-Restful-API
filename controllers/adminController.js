const { Product } = require("../model/productModel");

exports.getAddProduct = (req, res, next) => {
  console.log("here we go");
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-products",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProduct = (req, res) => {
  res.render("admin/products", {
    pageTitle: "Add Product",
    path: "/admin/products",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
