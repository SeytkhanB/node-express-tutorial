// MIDDLEWARE
// Express middleware our functions that execute during the request to the server
// Each middleware function has access to request and response objects
// When you work with middleware you "MUST" pass it on to "next"
//
// As I understood middleware function helps us to handle requests and
// response and modify them like axios.intersepters if you remember. that's why they are so powerful.
// Also we can use them anywhere we want
// "next" <-- means "do next". what we have after
// our middleware it should work with "next"

import express from "express";
import fetch from "node-fetch";

const app = express();

const logger = async (req, res, next) => {
  // "req, res, next" <-- will added automatically by express
  // we can catch "req, res, next", use them and
  // continue working with "next". THIS IS MIDDLEWARE

  // example ↓
  // const method = req.method;
  // const url = req.url;
  // const time = new Date().getFullYear();

  // example ↓
  // const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  // const data = await resp.json();
  // console.log(data);

  next();
};

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/about", logger, (req, res) => {
  res.send("About page");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
