const { Product } = require("../model/productModel");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-products",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body);
  product.save();
  res.redirect("/");
};

exports.getProduct = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "Admin Product",
      prods: products,
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
