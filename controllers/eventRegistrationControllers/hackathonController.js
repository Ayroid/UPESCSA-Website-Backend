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

import { HACKATHONMODEL } from "../../models/eventRegistrationModels/hackathonRegistrationModel.js";

const createHackathon = async (req, res) => {
  try {
    let {
      teamName,
      teamSize,
      teamCategory,
      teamLeadName,
      teamLeadEmail,
      teamLeadPhone,
      teamLeadUPESStudent,
      teamLeadSapID,
      teamLeadCollegeName,
      teamLeadCSAMember,
      teamLeadCSAID,
      teamLeadCourse,
      teamLeadYearOfStudy,
      memberTwoName,
      memberTwoEmail,
      memberTwoPhone,
      memberTwoUPESStudent,
      memberTwoSapID,
      memberTwoCollegeName,
      memberTwoCSAMember,
      memberTwoCSAID,
      memberTwoCourse,
      memberTwoYearOfStudy,
      memberThreeName,
      memberThreeEmail,
      memberThreePhone,
      memberThreeUPESStudent,
      memberThreeSapID,
      memberThreeCollegeName,
      memberThreeCSAMember,
      memberThreeCSAID,
      memberThreeCourse,
      memberThreeYearOfStudy,
      memberFourName,
      memberFourEmail,
      memberFourPhone,
      memberFourUPESStudent,
      memberFourSapID,
      memberFourCollegeName,
      memberFourCSAMember,
      memberFourCSAID,
      memberFourCourse,
      memberFourYearOfStudy,
      transactionID,
    } = req.body;

    console.log(req.files);

    const transactionSS = `${SERVER_URI}/images/hackathon/${req.files["hackathonTransactionSS"][0].filename}`;

    if (teamSize < 4) {
      memberFourName = "-";
      memberFourEmail = "-";
      memberFourPhone = "-";
      memberFourCourse = "-";
      memberFourYearOfStudy = "-";
      memberFourSapID = "-";
      memberFourCSAMember = "-";
      memberFourCSAID = "-";
    }

    if (teamSize < 3) {
      memberThreeName = "-";
      memberThreeEmail = "-";
      memberThreePhone = "-";
      memberThreeCourse = "-";
      memberThreeYearOfStudy = "-";
      memberThreeSapID = "-";
      memberThreeCSAMember = "-";
      memberThreeCSAID = "-";
    }

    if (teamLeadUPESStudent === "yes") {
      teamLeadCollegeName = "UPES";
    } else {
      teamLeadSapID = "-";
      teamLeadCSAMember = "-";
      teamLeadCSAID = "-";
    }

    if (memberTwoUPESStudent === "yes") {
      memberTwoCollegeName = "UPES";
    } else {
      memberTwoSapID = "-";
      memberTwoCSAMember = "-";
      memberTwoCSAID = "-";
    }

    if (memberThreeUPESStudent === "yes") {
      memberThreeCollegeName = "UPES";
    } else {
      memberThreeSapID = "-";
      memberThreeCSAMember = "-";
      memberThreeCSAID = "-";
    }

    if (memberFourUPESStudent === "yes") {
      memberFourCollegeName = "UPES";
    } else {
      memberFourSapID = "-";
      memberFourCSAMember = "-";
      memberFourCSAID = "-";
    }

    const registered = await CREATEEVENTREGISTRATIONDB(HACKATHONMODEL, {
      teamName,
      teamSize,
      teamCategory,
      teamLeadName,
      teamLeadEmail,
      teamLeadPhone,
      teamLeadCourse,
      teamLeadYearOfStudy,
      teamLeadUPESStudent,
      teamLeadCollegeName,
      teamLeadSapID,
      teamLeadCSAMember,
      teamLeadCSAID,
      memberTwoName,
      memberTwoEmail,
      memberTwoPhone,
      memberTwoCourse,
      memberTwoYearOfStudy,
      memberTwoUPESStudent,
      memberTwoCollegeName,
      memberTwoSapID,
      memberTwoCSAMember,
      memberTwoCSAID,
      memberThreeName,
      memberThreeEmail,
      memberThreePhone,
      memberThreeCourse,
      memberThreeYearOfStudy,
      memberThreeUPESStudent,
      memberThreeCollegeName,
      memberThreeSapID,
      memberThreeCSAMember,
      memberThreeCSAID,
      memberFourName,
      memberFourEmail,
      memberFourPhone,
      memberFourCourse,
      memberFourYearOfStudy,
      memberFourUPESStudent,
      memberFourCollegeName,
      memberFourSapID,
      memberFourCSAMember,
      memberFourCSAID,
      transactionID,
      transactionSS,
    });

    if (registered) {
      console.log(REGISTRATION_MESSAGES.REGISTRATION_CREATED, { registered });

      SENDMAIL(teamName, teamLeadEmail, "HACKATHON");

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

const readHackathon = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const event = await READEVENTREGISTRATIONDB(HACKATHONMODEL, query, fields);

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

export { createHackathon as CREATEHACKATHON, readHackathon as READHACKATHON };
