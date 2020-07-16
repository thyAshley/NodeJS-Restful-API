require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStorage = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const errorController = require("./controllers/errorController");
const User = require("./models/userModel");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const MONGODB_URI = `mongodb+srv://admin-ashley:${process.env.MONGO_PASSWORD}@testdb-ukelm.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();

const store = new MongoDBStorage({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtect = csrf();

app.use(
  session({
    secret: "my session value",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(csrfProtect);
app.use(flash());

app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((user) => {
        return (req.user = user);
      })
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then((res) => {
    console.log("connected to mongodb Atlas");
    app.listen(3000, () => {
      console.log("Server started at port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
