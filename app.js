const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/about") {
    res.write("<h1>About me</h1>");
    res.end();
  } else {
    res.write("<h1>Hello World</h1>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("port started on port 3000");
});
