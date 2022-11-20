import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { nanoid } from "nanoid";
import { BadRequestError } from "../errors/index.js";
dotenv.config();

const login = async (req, res) => {
  const { username, password } = req.body;
  // validations to use. we have multiple options:
  //    - mongoose validations
  //    - Joi
  //    - check in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide all credentials!");
  }

  // just for demo, normally provided by DB!
  const id = nanoid();

  // try to keep payload small, better experiance for user
  const token = JWT.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "50d",
  });

  res.status(200).json({ success: true, msg: "User created!", token: token });
};

const dashboard = async (req, res) => {
  const { id, username } = req.user;
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    success: true,
    msg: `Hello, ${username}`,
    secret: `Here is your authorized data and your lucky number is ${luckyNumber}`,
  });
};

export { dashboard, login };
