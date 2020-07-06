const express = require("express");
const path = require("path");

const app = express();

const { adminRoutes } = require("./routes/admin");
const { shopRoutes } = require("./routes/shop");

/* Set up middleware for express */
app.use(express.urlencoded({ extended: true }));

/* Set up Routers for express */
app.use("/admin", adminRoutes);
app.use(shopRoutes);

/* 404 Page */
app.use("/", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

/* Start server */
app.listen(3000, () => {
  console.log("server started on port 3000");
});
