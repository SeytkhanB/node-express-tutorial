import { products, people } from "./data.js";
import express from "express";
const app = express();

// id that comes from query is string always
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    res.status(200).json({ success: true, data: [] }); // common way
    return; // don't forget to use "return" always
  }

  res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
