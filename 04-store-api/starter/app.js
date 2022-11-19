import * as dotenv from "dotenv";
import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
import "express-async-errors";
const app = express();
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h2>Store API</h2><a href='/api/v1/products'>products</a>");
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log("Server is listening on port 5000..."));
  } catch (err) {
    console.log("error is in app.js and err is: ", err);
  }
};

start();
