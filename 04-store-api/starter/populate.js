import connectDB from "./db/connect.js";
import Product from "./models/product.js";
import jsonProducts from "./products.json" assert { type: "json" };
import * as dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await Product.deleteMany(); // optional
    await Product.create(jsonProducts);
    console.log("Success!!!");
    process.exit(0); // exit the process. 0 <-- means everything went well
  } catch (err) {
    console.log("err inside populate.js: ", err);
    process.exit(1); // 1 <-- means there is an error
  }
};

start();
