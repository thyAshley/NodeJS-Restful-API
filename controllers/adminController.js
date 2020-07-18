const { validationResult } = require("express-validator");

const Product = require("../models/productModel");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;
  if (!editMode) res.redirect("/");

  Product.findById(productId)
    .then((prod) => {
      if (!prod) return res.redirect("/");
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        prods: prod,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;
  Product.findById(productId).then((product) => {
    if (product.userId.toString() !== req.user._id.toString()) {
      return res.redirect("/");
    }
    product.title = title;
    product.productId = productId;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;

    return product
      .save()
      .then((result) => {
        console.log("updated!");
        res.render("/admin/edit-product", {
          pageTitle: "Edit Product",
          path: "/admin/edit-product",
          ediing: req.query.edit,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;
  const product = new Product({
    title,
    price,
    imageUrl,
    description,
    userId: req.session.user._id,
  });
  const error = validationResult(req);

  if (!error) {
    res.statis(422).render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Add Product",
      editing: false,
      hasError: true,
      product,
    });
  }
  product
    .save()
    .then((result) =>
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Add Product",
        editing: false,
      })
    )
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((result) => {
      res.render("admin/products", {
        pageTitle: "Admin Product",
        path: "/admin/products",
        prods: result,
      });
    })
    .catch((err) => console.log(err));
};
