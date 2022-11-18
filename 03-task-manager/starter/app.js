import connectDB from "./db/connect.js";
import taskRouter from "./routes/tasks.js";
import express from "express";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.static("./public"));
// parse json data. this is middleware
app.use(express.json()); // if we don't use this, then we won't have that data in req.body

app.use("/api/v1/tasks", taskRouter);
app.use(notFound); // it works because it placed after all requests, that's why
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log("error inside app.js and error is: ", error);
  }
};

start();
