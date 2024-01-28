import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { SERVER_MESSAGES } from "../utils/messages.js";

dotenv.config();

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });
    return { token, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token, tokenType) => {
  try {
    let payload;
    if (tokenType === "accessToken") {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } else if (tokenType === "refreshToken") {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } else {
      return false;
    }
    return payload;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const verifyTokenMW = (req, res, next) => {
  try {
    let accessToken = req.headers.authorization;
    if (!accessToken) {
      console.log("No access token");
      return res.status(401).send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    accessToken = accessToken.split(" ")[1];
    const payload = verifyToken(accessToken, "accessToken");
    if (!payload) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    }
    req.user = payload;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
  }
};

export {
  generateToken as GENERATETOKEN,
  verifyToken as VERIFYTOKEN,
  verifyTokenMW as VERIFYTOKENMW,
};
