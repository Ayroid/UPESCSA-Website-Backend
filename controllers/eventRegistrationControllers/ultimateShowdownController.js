import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  REGISTRATION_MESSAGES,
  SERVER_MESSAGES,
} from "../../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEEVENTREGISTRATIONDB,
  READEVENTREGISTRATIONDB,
} from "../database/eventRegistrationDatabase.js";

// IMPORT MODELS

import { ULTIMATESHOWDOWNMODEL } from "../../models/eventRegistrationModels/ultimateShowdown.js";

const createUltimateShowdown = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      sapID,
      course,
      yearOfStudy,
      csaMember,
      csaID,
      transactionID,
    } = req.body;

    console.log(req.files);

    const transactionSS = `${SERVER_URI}/images/registrations/ultimateShowdown/${req.files["ultimateShowdownTransactionSS"][0].filename}`;

    const registered = await CREATEEVENTREGISTRATIONDB(ULTIMATESHOWDOWNMODEL, {
      name,
      email,
      phone,
      sapID,
      course,
      yearOfStudy,
      csaMember,
      csaID,
      transactionID,
      transactionSS,
    });

    if (registered) {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_CREATED, { registered });
      return res.status(StatusCodes.CREATED).send({
        response: REGISTRATION_MESSAGES.REGISTRATION_CREATED,
        eventId: registered._id,
      });
    } else {
      console.log(REGISTRATION_MESSAGES.ERROR_CREATING_REGISTRATION, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(REGISTRATION_MESSAGES.ERROR_CREATING_REGISTRATION, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readUltimateShowdown = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const event = await READEVENTREGISTRATIONDB(
      ULTIMATESHOWDOWNMODEL,
      query,
      fields
    );

    if (event.length > 0) {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_FOUND, { event });

      return res.status(StatusCodes.OK).send(event);
    } else {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_NOT_FOUND, { event });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(REGISTRATION_MESSAGES.REGISTRATION_NOT_FOUND);
    }
  } catch (error) {
    console.log(REGISTRATION_MESSAGES.ERROR_READING_REGISTRATION, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createUltimateShowdown as CREATEULTIMATESHOWDOWN,
  readUltimateShowdown as READULTIMATESHOWDOWN,
};
