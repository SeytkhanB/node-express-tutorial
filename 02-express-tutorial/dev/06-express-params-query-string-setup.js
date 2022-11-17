import { products, people } from "./data.js";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="/api/products">Products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image, price } = product;
    return { id, name, image, price };
  });
  res.send(newProducts);
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
