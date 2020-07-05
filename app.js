const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"></input><button>Send</button></form>'
    );
    res.write("</html>");
    res.end();
  } else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  } else {
    res.write("<h1>Hello World</form>");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("port started on port 3000");
});
