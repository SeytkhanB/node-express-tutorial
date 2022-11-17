import express from "express";
import logger from "./dev/logger.js";
import authorize from "./dev/authorize.js";

const app = express();

app.use([authorize, logger]); // multiple middleware functions and order is matter

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
