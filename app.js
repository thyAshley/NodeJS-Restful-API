const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const errorController = require("./controllers/errorController");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const mongo = require("./util/database");
const User = require("./models/userModel");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5f08483d0d70ad3728c431ce")
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

mongo.mongoConnect((client) => {
  app.listen(3000, () => {
    console.log("Server started at port 3000");
  });
});
