// What is MVC in Express JS?
// MVC stands for Model, View, Controller is an architectural pattern that
// separates an application into three main logical components: the model, the
// view, and the controller. Each one of these components is built to handle
// specific development aspects of an application.

import authRouter from "./routes/auth.js";
import peopleRouter from "./routes/people.js";
import express from "express";
const app = express();

// static assets
app.use(express.static("./methods-public"));

// parse form data. when you don't use axios request the data comes in "html" format
app.use(express.urlencoded({ extended: false })); // helps us to get inputs data that comes from browser

// parse json data.
app.use(express.json());

app.use("/api/people", peopleRouter);
app.use("/login", authRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
