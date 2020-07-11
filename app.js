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

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("5f0951d66b827a29b0ed7761")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   next();
// });

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
    app.listen(3000, () => {
      console.log("Server started at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
