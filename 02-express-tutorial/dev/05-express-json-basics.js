// SSR <-- stands for "Server Side Rendering"

import { products, people } from "./data.js";
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json(products);
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
