import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import { genSalt, hash, compare } from "bcrypt";
import { GENERATETOKEN } from "../middlewares/jwtAuthMW.js";
import { USER_MESSAGES, SERVER_MESSAGES } from "../utils/messages.js";

// ENVIRONMENT VARIABLES
dotenv.config();

// CONSTANTS
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);
const fields = {
  __v: 0,
  password: 0,
  createdAt: 0,
  updated_at: 0,
};

const populateFields = "messages";
const populateFieldsSelect = { content: 1 };

// DATABASE CONTROLLERS

import {
  CREATE_USER_DB,
  READ_USER_DB,
  UPDATE_USER_DB,
  DELETE_USER_DB,
} from "./database/userDatabase.js";

// CONTROLLERS

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const query = { email };

    const salt = await genSalt(SALT_ROUNDS);
    const hashedPassword = await hash(password, salt);

    const userExists = await READ_USER_DB(query);
    if (userExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(USER_MESSAGES.USER_ALREADY_EXISTS);
    }

    const user = await CREATE_USER_DB({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      console.log(USER_MESSAGES.USER_CREATED, { user });
      return res.status(StatusCodes.CREATED).send(USER_MESSAGES.USER_CREATED);
    } else {
      console.log(USER_MESSAGES.ERROR_CREATING_USER);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_CREATING_USER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const user = await READ_USER_DB(
      query,
      fields,
      populateFields,
      populateFieldsSelect
    );
    if (user.length > 0) {
      console.log(USER_MESSAGES.USER_FOUND, { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(USER_MESSAGES.USER_NOT_FOUND, { user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USER_MESSAGES.USER_NOT_FOUND);
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_READING_USER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const data = req.body;
    const user = await UPDATE_USER_DB(query, data, fields);
    if (user) {
      console.log(USER_MESSAGES.USER_UPDATED, { user });
      return res.status(StatusCodes.OK).send(user);
    } else {
      console.log(USER_MESSAGES.USER_NOT_UPDATED, { user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USER_MESSAGES.USER_NOT_UPDATED);
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_UPDATING_USER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteUser = async (req, res) => {
  try {
    const query = { _id: req.user.user_id };
    const user = await DELETE_USER_DB(query);
    if (user) {
      console.log(USER_MESSAGES.USER_DELETED, { user });
      return res.status(StatusCodes.OK).send(USER_MESSAGES.USER_DELETED);
    } else {
      console.log(USER_MESSAGES.USER_NOT_DELETED, { user });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(USER_MESSAGES.USER_NOT_DELETED);
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_DELETING_USER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const query = { email };

  const user = await READ_USER_DB(query);

  if (user.length > 0) {
    const validPassword = await compare(password, user[0].password);
    if (validPassword) {
      let payload = { user_id: user[0]._id, email };
      const { token, refreshToken } = GENERATETOKEN(payload);
      payload = {
        user_id: user[0]._id,
        username: user[0].username,
        messages: user[0].messages,
      };
      console.log(USER_MESSAGES.USER_LOGGED_IN, { user });
      return res.status(StatusCodes.OK).json({ token, refreshToken, payload });
    } else {
      console.log(USER_MESSAGES.USER_NOT_AUTHORIZED);
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(USER_MESSAGES.USER_NOT_AUTHORIZED);
    }
  } else {
    console.log(USER_MESSAGES.USER_NOT_FOUND);
    return res.status(StatusCodes.NOT_FOUND).send(USER_MESSAGES.USER_NOT_FOUND);
  }
};

export {
  createUser as CREATE_USER,
  readUser as READ_USER,
  updateUser as UPDATE_USER,
  deleteUser as DELETE_USER,
  loginUser as LOGIN_USER,
};
