import express from "express";
import { people } from "./data.js";
const app = express();

app.use(express.static("./methods-public"));

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
