import express from "express";
import { people } from "./data.js";
const app = express();

// static assets
app.use(express.static("./methods-public"));

// parse form data. when you don't use axios request the data comes in "html" format
app.use(express.urlencoded({ extended: false })); // helps us to get inputs data that comes from browser

// parse json data.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("Please provide credentials!");
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }

  people.push({ name: name, id: 69 });
  res.status(201).json({ success: true, person: name });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
