import express from "express";
import morgan from "morgan";

const app = express();

// Morgan: Morgan is an HTTP request level Middleware. It is a great tool that
// logs the requests along with some other information depending upon its
// configuration and the preset used. It proves to be very helpful while
// debugging and also if you want to create Log files
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  console.log(req.user); // we can access "req.user" if authorize works
  res.send("Items");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
