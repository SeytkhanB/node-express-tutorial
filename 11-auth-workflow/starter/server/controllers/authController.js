import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import User from "../model/User.js";
import {
  sendResetPasswordEmail,
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  createHash,
} from "../utils/index.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Token from "../model/Token.js";
import dotenv from "dotenv";
dotenv.config();

// ------------------------------------------------------------
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists!");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  // the adress where the user will be redirected after verifying email
  const origin = process.env.ORIGIN_URL;

  // FOR SENDING LINK TO EMAIL ------------------------
  // const info = await sendVerificationEmail({
  //   name: user.name,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  //   origin,
  // });
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // returns link to email
  // FOR SENDING LINK TO EMAIL ------------------------

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verificationToken back only while testing in postman!!
  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: "Success!! Please check your email to verify account",
  });
};

// ------------------------------------------------------------
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Unauthorized! User not found");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnAuthenticatedError("Unauthorized! Incorrect password");
  }

  if (!user.isVerified) {
    throw new UnAuthenticatedError("Please verify your email!");
  }

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = "";

  // check for existing token
  const existingToken = await Token.findOne({ createdBy: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnAuthenticatedError("Invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, createdBy: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });
  res.status(StatusCodes.OK).json({ success: true, user: tokenUser });
};

// ------------------------------------------------------------
const logout = async (req, res) => {
  await Token.findOneAndDelete({ createdBy: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ success: true, msg: "Logged out!" });
};

// ------------------------------------------------------------
const verifyEmail = async (req, res) => {
  const {
    body: { verificationToken, email },
  } = req;

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError("Verification failed!");
  }

  // for the second time it won't match, becuse we set " user.verificationToken = "" "
  if (user.verificationToken !== verificationToken) {
    throw new UnAuthenticatedError("Verification failed!");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";
  await user.save();

  res.status(StatusCodes.OK).json({ success: true, msg: "Eamil verified!" });
};

// ------------------------------------------------------------
const forgotPassword = async (req, res) => {
  const {
    body: { email },
  } = req;
  if (!email) {
    throw new BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("No email found");
  }
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email

    // FOR SENDING LINK TO EMAIL ------------------------
    // const info = await sendVerificationEmail({
    //   name: user.name,
    //   email: user.email,
    //   verificationToken: user.verificationToken,
    //   origin,
    // });
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // returns link to email
    // FOR SENDING LINK TO EMAIL ------------------------

    const origin = process.env.ORIGIN_URL;
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res.status(StatusCodes.OK).json({
    success: true,
    msg: "Please check your email for reset password link",
  });
};

// ------------------------------------------------------------
const resetPassword = async (req, res) => {
  const {
    body: { token, email, password },
  } = req;

  if (!token || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`No user with this email: ${email}`);
  }
  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ success: true, msg: "reset password" });
};

export { register, login, logout, verifyEmail, forgotPassword, resetPassword };
