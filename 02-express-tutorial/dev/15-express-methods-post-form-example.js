import express from "express";
import { people } from "./data.js";
const app = express();

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false })); // helps us to get inputs data that comes from browser

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/login", (req, res) => {
  // people.push({ name: req.body.name, id: 69 });
  const { name } = req.body.name;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials!");
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
