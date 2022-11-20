import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";
dotenv.config();

const authorizationMiddlerware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("No token provided!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }
};

export default authorizationMiddlerware;
