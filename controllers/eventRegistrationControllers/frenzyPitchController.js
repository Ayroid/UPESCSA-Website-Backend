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

// MAILING FUNCTION

import { SENDMAIL } from "../../utils/mailer.js";

// IMPORT MODELS

import { FRENZYPITCHMODEL } from "../../models/eventRegistrationModels/frenzyPitchRegistrationModel.js";

const createFrenzyPitch = async (req, res) => {
  try {
    let {
      teamName,
      teamSize,
      teamLeadName,
      teamLeadEmail,
      teamLeadPhone,
      teamLeadCourse,
      teamLeadYearOfStudy,
      teamLeadSapID,
      teamLeadCSAMember,
      teamLeadCSAID,
      memberTwoName,
      memberTwoEmail,
      memberTwoPhone,
      memberTwoCourse,
      memberTwoYearOfStudy,
      memberTwoSapID,
      memberTwoCSAMember,
      memberTwoCSAID,
      memberThreeName,
      memberThreeEmail,
      memberThreePhone,
      memberThreeCourse,
      memberThreeYearOfStudy,
      memberThreeSapID,
      memberThreeCSAMember,
      memberThreeCSAID,
      memberFourName,
      memberFourEmail,
      memberFourPhone,
      memberFourCourse,
      memberFourYearOfStudy,
      memberFourSapID,
      memberFourCSAMember,
      memberFourCSAID,
      transactionID,
    } = req.body;

    console.log(req.files);

    const transactionSS = `${SERVER_URI}/images/registrations/frenzypitch/${req.files["frenzyPitchTransactionSS"][0].filename}`;

    if (teamSize < 4) {
      memberFourName = "";
      memberFourEmail = "";
      memberFourPhone = "";
      memberFourCourse = "";
      memberFourYearOfStudy = "";
      memberFourSapID = "";
      memberFourCSAMember = "";
      memberFourCSAID = "";
    }

    if (teamSize < 3) {
      memberThreeName = "";
      memberThreeEmail = "";
      memberThreePhone = "";
      memberThreeCourse = "";
      memberThreeYearOfStudy = "";
      memberThreeSapID = "";
      memberThreeCSAMember = "";
      memberThreeCSAID = "";
    }

    const registered = await CREATEEVENTREGISTRATIONDB(FRENZYPITCHMODEL, {
      teamName,
      teamSize,
      teamLeadName,
      teamLeadEmail,
      teamLeadPhone,
      teamLeadCourse,
      teamLeadYearOfStudy,
      teamLeadSapID,
      teamLeadCSAMember,
      teamLeadCSAID,
      memberTwoName,
      memberTwoEmail,
      memberTwoPhone,
      memberTwoCourse,
      memberTwoYearOfStudy,
      memberTwoSapID,
      memberTwoCSAMember,
      memberTwoCSAID,
      memberThreeName,
      memberThreeEmail,
      memberThreePhone,
      memberThreeCourse,
      memberThreeYearOfStudy,
      memberThreeSapID,
      memberThreeCSAMember,
      memberThreeCSAID,
      memberFourName,
      memberFourEmail,
      memberFourPhone,
      memberFourCourse,
      memberFourYearOfStudy,
      memberFourSapID,
      memberFourCSAMember,
      memberFourCSAID,
      transactionID,
      transactionSS,
    });

    if (registered) {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_CREATED, { registered });

      SENDMAIL(teamName, teamLeadEmail, "FRENZYPITCH");

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

const readFrenzyPitch = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const event = await READEVENTREGISTRATIONDB(
      FRENZYPITCHMODEL,
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
  createFrenzyPitch as CREATEFRENZYPITCH,
  readFrenzyPitch as READFRENZYPITCH,
};
