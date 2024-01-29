import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  ALLIANCE_MESSAGES,
  SERVER_MESSAGES,
} from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEALLIANCEDB,
  READALLIANCEDB,
  UPDATEALLIANCEDB,
  DELETEALLIANCEDB,
} from "./database/allianceDatabase.js";

// CONTROLLERS

const createAlliance = async (req, res) => {
  try {
    console.log(req.files);
    const { allianceName, allianceWebsiteURL } = req.body;
    const query = { allianceName };

    const allianceExists = await READALLIANCEDB(query, fields);
    if (allianceExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(ALLIANCE_MESSAGES.ALLIANCE_ALREADY_EXISTS);
    }

    const allianceImageURL = `${SERVER_URI}/images/alliance/${req.files["allianceImg"][0].filename}`;

    const alliance = await CREATEALLIANCEDB({
      allianceName,
      allianceImageURL,
      allianceWebsiteURL,
    });

    if (alliance) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_CREATED, { alliance });
      return res.status(StatusCodes.CREATED).send({
        response: ALLIANCE_MESSAGES.ALLIANCE_CREATED,
        allianceId: alliance._id,
      });
    } else {
      console.log(ALLIANCE_MESSAGES.ERROR_CREATING_ALLIANCE, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_CREATING_ALLIANCE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readAlliance = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const alliance = await READALLIANCEDB(query, fields);

    if (alliance.length > 0) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_FOUND, { alliance });

      return res.status(StatusCodes.OK).send(alliance);
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_FOUND, { alliance });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALLIANCE_MESSAGES.ALLIANCE_NOT_FOUND);
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_READING_ALLIANCE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateAlliance = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const alliance = await UPDATEALLIANCEDB(query, data, fields);
    if (alliance) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_UPDATED, { alliance });
      return res.status(StatusCodes.OK).send(alliance);
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_UPDATED, { alliance });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALLIANCE_MESSAGES.ALLIANCE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_UPDATING_ALLIANCE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteAlliance = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const alliance = await DELETEALLIANCEDB(query);
    if (alliance) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_DELETED, { alliance });
      return res
        .status(StatusCodes.OK)
        .send(ALLIANCE_MESSAGES.ALLIANCE_DELETED);
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_DELETED, { alliance });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(ALLIANCE_MESSAGES.ALLIANCE_NOT_DELETED);
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_DELETING_ALLIANCE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createAlliance as CREATEALLIANCE,
  readAlliance as READALLIANCE,
  updateAlliance as UPDATEALLIANCE,
  deleteAlliance as DELETEALLIANCE,
};
