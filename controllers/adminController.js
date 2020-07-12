const Product = require("../models/productModel");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
  Product.findOneAndUpdate(
    { _id: productId },
    {
      title,
      price,
      description,
      imageUrl,
    },
    (err, res) => {
      if (err) console.log(err);
    }
  );
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
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
    userId: req.user._id,
  });
  product
    .save()
    .then((result) => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((result) => {
      res.render("admin/products", {
        pageTitle: "Admin Product",
        path: "/admin/products",
        prods: result,
      });
    })
    .catch((err) => console.log(err));
};
