const User = require("../models/userModel");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: req.session.isAuth,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5f0aa9fd366c241dcc6741bd")
    .then((user) => {
      req.session.isAuth = true;
      req.session.user = user;
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuth: false,
  });
};
exports.postSignup = (req, res, next) => {};
