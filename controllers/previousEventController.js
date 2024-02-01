import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { EVENT_MESSAGES, SERVER_MESSAGES } from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEPREVIOUSEVENTDB,
  UPDATEPREVIOUSEVENTDB,
  DELETEPREVIOUSEVENTDB,
  READPREVIOUSEVENTDB,
} from "./database/previousEventDatabase.js";

const createPreviousEvent = async (req, res) => {
  try {
    const { previousEventName, previousEventYear } = req.body;
    const query = { previousEventName };

    const previousEventExists = await READPREVIOUSEVENTDB(query, fields);
    if (previousEventExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(EVENT_MESSAGES.EVENT_ALREADY_EXISTS);
    }

    const previousEventImageURL = `${SERVER_URI}/images/previousEvents/${req.files["previousEventImg"][0].filename}`;

    const previousEvent = await CREATEPREVIOUSEVENTDB({
        previousEventName,
        previousEventImageURL,
        previousEventYear,
    });

    if (previousEvent) {
      console.log(EVENT_MESSAGES.EVENT_CREATED, { previousEvent });
      return res.status(StatusCodes.CREATED).send({
        response: EVENT_MESSAGES.EVENT_CREATED,
        previousEventId: previousEvent._id,
      });
    } else {
      console.log(EVENT_MESSAGES.ERROR_CREATING_EVENT, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_CREATING_EVENT, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readPreviousEvent = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const previousEvent = await READPREVIOUSEVENTDB(query, fields);

    if (previousEvent.length > 0) {
      console.log(EVENT_MESSAGES.EVENT_FOUND, { previousEvent });

      return res.status(StatusCodes.OK).send(previousEvent);
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_FOUND, { previousEvent });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(EVENT_MESSAGES.EVENT_NOT_FOUND);
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_READING_EVENT, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updatePreviousEvent = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const updated = await UPDATEPREVIOUSEVENTDB(query, data, fields);
    if (updated) {
      console.log(EVENT_MESSAGES.EVENT_UPDATED, { updated });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_UPDATED, { updated });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(EVENT_MESSAGES.EVENT_NOT_UPDATED);
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_UPDATING_EVENT, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deletePreviousEvent = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const deleted = await DELETEPREVIOUSEVENTDB(query);
    if (deleted) {
      console.log(EVENT_MESSAGES.EVENT_DELETED, { deleted });
      return res.status(StatusCodes.OK).send(EVENT_MESSAGES.EVENT_DELETED);
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_DELETED, { deleted });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(EVENT_MESSAGES.EVENT_NOT_DELETED);
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_DELETING_EVENT, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createPreviousEvent as CREATEPREVIOUSEVENT,
  readPreviousEvent as READPREVIOUSEVENT,
  updatePreviousEvent as UPDATEPREVIOUSEVENT,
  deletePreviousEvent as DELETEPREVIOUSEVENT,
};
