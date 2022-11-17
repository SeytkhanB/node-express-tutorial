import path from "path";
import express from "express";

const __dirname = path.resolve();
const app = express();

// setup static and middleware
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Resource not found!</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
