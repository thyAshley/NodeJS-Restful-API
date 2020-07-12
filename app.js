require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/errorController");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");

const User = require("./models/userModel");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f0aa9fd366c241dcc6741bd")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://admin-ashley:${process.env.MONGO_PASSWORD}@testdb-ukelm.mongodb.net/shop?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then((res) => {
    console.log("connected to mongodb Atlas");
    User.findOne().then((result) => {
      if (!result) {
        const user = new User({
          name: "Josh",
          email: "Josh@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
        console.log("user created");
      }
    });
    app.listen(3000, () => {
      console.log("Server started at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
