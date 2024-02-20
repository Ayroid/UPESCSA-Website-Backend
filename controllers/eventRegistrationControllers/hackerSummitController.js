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

import { HACKERSUMMITMODEL } from "../../models/eventRegistrationModels/hackerSummitRegistrationModel.js";

const createRegistration = async (req, res) => {
  try {
    const {
      studentName,
      email,
      phone,
      course,
      yearOfStudy,
      upesStudent,
      collegeName,
      sapID,
    } = req.body;

    const event = await CREATEEVENTREGISTRATIONDB(HACKERSUMMITMODEL, {
      studentName,
      email,
      phone,
      course,
      yearOfStudy,
      upesStudent,
      collegeName,
      sapID,
    });

    if (event) {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_CREATED, { event });
      return res.status(StatusCodes.CREATED).send({
        response: REGISTRATION_MESSAGES.REGISTRATION_CREATED,
        eventId: event._id,
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

const readRegistration = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const event = await READEVENTREGISTRATIONDB(
      HACKERSUMMITMODEL,
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
  createRegistration as CREATEREGISTRATION,
  readRegistration as READREGISTRATION,
};
