const express = require("express");
const path = require("path");

const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");
const errorController = require("./controllers/errorController");

const app = express();

/* Set up templating engine */
app.set("view engine", "ejs");
app.set("views", "views");

/* Set up middleware for express */
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Set up Routers for express */
app.use("/admin", adminRoutes);
app.use(shopRoutes);

/* 404 Page */
app.use("/", errorController.pageNotFound);

/* Start server */
app.listen(3000, () => {
  console.log("server started on port 3000");
});
