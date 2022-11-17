import express from "express";

const app = express();

app.use(express.static("./public"));

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found!</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
