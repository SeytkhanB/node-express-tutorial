import express from "express";
import { people } from "./data.js";
const app = express();

// static assets
app.use(express.static("./methods-public"));

// parse form data. when you don't use axios request the data comes in "html" format
app.use(express.urlencoded({ extended: false })); // helps us to get inputs data that comes from browser

// parse json data.
app.use(express.json());

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === Number(id));

  if (!name || !id || !person) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide credentials!" });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `Couldn't find a person with id: ${id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
