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

app.get("/api/products/:productId", (req, res) => {
  const id = Number(req.params.productId);
  const singleProduct = products.find((product) => product.id === id);
  if (!singleProduct) {
    res.status(404).send("<h2>Product doesn't exist</h2>");
    return;
  }
  res.json(singleProduct);
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
