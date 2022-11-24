import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ success: true, products });
};

const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    throw new BadRequestError("Please provide all values");
  }
  const product = await Product.create({ name, price, image });
  res.status(StatusCodes.CREATED).json({ success: true, product });
};

export { getAllProducts, createProduct };
