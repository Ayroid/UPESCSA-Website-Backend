import { StatusCodes } from "http-status-codes";
import { VERIFYTOKEN, GENERATETOKEN } from "../middlewares/jwtAuthMW.js";
import { SERVER_MESSAGES } from "../utils/messages.js";

// CONTROLLERS

const verifyToken = (req, res) => {
  let accessToken = req.headers.authorization;
  if (!accessToken) {
    console.log(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
  }
  accessToken = accessToken.split(" ")[1];
  const payload = VERIFYTOKEN(accessToken, "accessToken");
  if (!payload) {
    console.log(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
  } else {
    console.log(SERVER_MESSAGES.AUTHORIZED_ACCESS);
    return res.status(StatusCodes.OK).send(SERVER_MESSAGES.AUTHORIZED_ACCESS);
  }
};

const refreshToken = (req, res) => {
  let refreshToken = req.headers.authorization;
  if (!refreshToken) {
    console.log(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
  }
  refreshToken = refreshToken.split(" ")[1];
  let payload = VERIFYTOKEN(refreshToken, "refreshToken");
  if (!payload) {
    console.log(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(SERVER_MESSAGES.UNAUTHORIZED_ACCESS);
  } else {
    payload = {
      user_id: payload.user_id,
      email: payload.email,
    };
    const { token } = GENERATETOKEN(payload);
    console.log(SERVER_MESSAGES.AUTHORIZED_ACCESS);
    return res.status(StatusCodes.OK).json({ token });
  }
};

export { verifyToken as VERIFY_TOKEN, refreshToken as REFRESH_TOKEN };
