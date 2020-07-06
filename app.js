const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("in middleware");
  next();
});

app.use((req, res, next) => {
  console.log("in middleware 2");
  res.send("<h1>Hello from Middleware</h1>");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});

app.route("/").get((req, res) => {
  res.end("hello");
});

// const { requestHandler } = require("./routes");

// const server = http.createServer(requestHandler);

// server.listen(3000, () => {
//   console.log("port started on port 3000");
// });
