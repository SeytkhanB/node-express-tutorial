import dotenv from "dotenv";
import JWT from "jsonwebtoken";
dotenv.config();

const createJWT = ({ payload }) => {
  const token = JWT.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => JWT.verify(token, process.env.JWT_SECRET);

// cookies were sent
const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const aMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + aMonth),
  });
};

// only one cookie was sent
// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });
//
//   const oneDay = 1000 * 60 * 60 * 24;
//
//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
// };

export { createJWT, isTokenValid, attachCookiesToResponse };
