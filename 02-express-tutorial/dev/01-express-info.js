import http from "http";
import { readFileSync } from "fs";

const homePage = readFileSync("./navbar-app/index.html");

const server = http.createServer((req, res) => {
  // console.log(req.method); // gives method that comes from front-end eg. "GET"/"POST"/"DELETE"/"PATCH"
  // console.log(req.url);  // gives url, everything after / eg. "/main"/"/about" etc

  // conditional should be chained
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html,css" });
    res.write(homePage);
    res.end();
  } else if (req.url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h2>About page</h2>");
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h2>Page not found</h2>");
    res.end();
  }
});

server.listen(5000);
