import express from "express";
import logger from "./dev/logger.js";

const app = express();

// app.use(logger); // will invoke "logger middleware" for each request automatically
// it must be placed above all requests
//
app.use("/api", logger); // if we add first argument as a path and we
// can add it, it will work only if path matches

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
  res.send("Items");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
