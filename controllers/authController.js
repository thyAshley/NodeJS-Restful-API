const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/userModel");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.NODEMAILER_APIKEY,
    },
  })
);

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    csrfToken: req.csrfToken(),
    errorMessage: req.flash("error"),
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid Email or Password");
        req.session.save(() => {
          return res.redirect("/login");
        });
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
            req.flash("error", "Invalid Email or Password");
            return res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: req.flash("error"),
  });
};
exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash("error", "Email already exist");
        return res.redirect("/signup");
      }
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
          return transporter
            .sendMail({
              to: email,
              from: "thyangashley@gmail.com",
              subject: "Welcome to Node Shop!",
              html: "<h1>You successfully signed up</h1>",
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.protectMiddleware = (req, res, next) => {
  if (!req.session.isAuth) {
    res.redirect("/");
  }
  next();
};

exports.getReset = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Password Reset",
    errorMessage: req.flash("error"),
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found!");
          req.session.save((err) => {
            if (err) console.log(err);
            res.redirect("/reset");
          });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600 * 1000;
        return user.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: "thy.ashley@gmail.com",
          from: "thyangashley@gmail.com",
          subject: "Request for password reset from Node Shop",
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">Link</a> to set a new password.</p>
          `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      console.log(user);
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "Reset Password",
        errorMessage: req.flash("error"),
        userId: user._id,
      });
    })
    .catch((err) => {
      console.log("err");
    });
};
