const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/user") {
    res.write("<html>");
    res.write("<ul>");
    res.write("<li>User 1</li");
    res.write("</ul>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/create-user" && req.method === "POST") {
    const message = [];
    req.on("data", (chunk) => {
      message.push(chunk);
    });
    req.on("end", () => {
      const value = Buffer.concat(message).toString();
      console.log(value.split("=")[1]);
    });
    res.setHeader("Location", "/");
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Hello World</h1>");
  res.write(
    '<form action="/create-user" method="POST"><input type="text" name="username"/><button>Submit</button></form>'
  );
  return res.end();
});

server.listen(3000, () => {
  console.log("server started on port 3000");
});
