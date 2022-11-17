import express from "express";
import { people } from "./data.js";
const app = express();

// static assets
app.use(express.static("./methods-public"));

// parse form data. when you don't use axios request the data comes in "html" format
app.use(express.urlencoded({ extended: false })); // helps us to get inputs data that comes from browser

// parse json data.
app.use(express.json());

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      msg: "Please provide name value you fucking...",
    });
  }

  const newPerson = { id: 42, name: name };
  res.status(201).json({ success: true, data: [...people, newPerson] });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
