const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuth: req.session.isAuth,
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("user does not exist");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isAuth = true;
            req.session.user = user;
            req.session.save((err) => {
              if (err) console.log(err);
              return res.redirect("/");
            });
          } else {
            return res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("error");
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
exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) return res.redirect("/login");
      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((user) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
