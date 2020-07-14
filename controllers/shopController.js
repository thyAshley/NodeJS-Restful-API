const Product = require("../models/productModel");
const Order = require("../models/orderModel");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product,
        pageTitle: product.title,
        path: "/products",
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        isAuth: req.session.isAuth,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate({
      path: "cart.items.productId",
      model: "Product",
    })
    .execPopulate()
    .then((user) => {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: user.cart.items,
        isAuth: req.session.isAuth,
      });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    req.user.addToCart(product).then((result) => {
      res.redirect("/cart");
    });
  });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Your Orders",
      orders,
      isAuth: req.session.isAuth,
    });
  });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      console.log(user.cart.items);
      const products = user.cart.items.map((item) => {
        return {
          quantity: item.quantity,
          productData: { ...item.productId._doc },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id,
        },
        products,
      });
      return order.save();
    })
    .then((saveOrder) => {
      return req.session.user.clearCart();
    })
    .then((clearCart) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
