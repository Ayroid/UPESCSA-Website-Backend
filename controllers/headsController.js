import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  HEADS_MESSAGES,
  COMMITTEE_MESSAGES,
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
  CREATEHEADSDB,
  UPDATEHEADSDB,
  DELETEHEADSDB,
  READHEADSDB,
} from "./database/headsDatabase.js";

import {
  READCOMMITTEEDB,
  UPDATECOMMITTEEDB,
} from "./database/committeeDatabase.js";

const createHeads = async (req, res) => {
  try {
    const { name, csaid, position, category, committee, linkedInURL } =
      req.body;
    const query = { csaid };

    const headsExists = await READHEADSDB(query, fields);
    if (headsExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(HEADS_MESSAGES.HEADS_ALREADY_EXISTS);
    }

    const committeeExists = await READCOMMITTEEDB({ committeeName: committee });

    if (committeeExists.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND);
    }

    const headImgURL = `${SERVER_URI}/images/heads/${req.files["headImg"][0].filename}`;

    const head = await CREATEHEADSDB({
      name,
      csaid,
      position,
      category,
      committee: committeeExists[0]._id,
      headImgURL,
      linkedInURL,
    });

    if (head) {
      console.log(HEADS_MESSAGES.HEADS_CREATED, {
        head,
      });

      const committee = await UPDATECOMMITTEEDB(
        { _id: committeeExists[0]._id },
        { $push: { committeeHeads: head._id } },
        fields
      );

      if (committee) {
        console.log(COMMITTEE_MESSAGES.COMMITTEE_UPDATED, { committee });
        return res.status(StatusCodes.CREATED).send({
          response: HEADS_MESSAGES.HEADS_CREATED,
          memberId: head._id,
        });
      } else {
        console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED, { committee });
        await DELETEHEADSDB({ _id: head._id });
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED);
      }
    } else {
      console.log(HEADS_MESSAGES.ERROR_CREATING_HEADS, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_CREATING_HEADS, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readHeads = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const read = await READHEADSDB(query, fields);

    if (read.length > 0) {
      console.log(HEADS_MESSAGES.HEADS_FOUND, {
        read,
      });

      return res.status(StatusCodes.OK).send(read);
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_FOUND, {
        read,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(HEADS_MESSAGES.HEADS_NOT_FOUND);
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_READING_HEADS, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateHeads = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const updated = await UPDATEHEADSDB(query, data, fields);
    if (updated) {
      console.log(HEADS_MESSAGES.HEADS_UPDATED, {
        updated,
      });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_UPDATED, {
        updated,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(HEADS_MESSAGES.HEADS_NOT_UPDATED);
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_UPDATING_HEADS, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteHeads = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const deleted = await DELETEHEADSDB(query);
    if (deleted) {
      console.log(HEADS_MESSAGES.HEADS_DELETED, {
        deleted,
      });
      return res.status(StatusCodes.OK).send(HEADS_MESSAGES.HEADS_DELETED);
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_DELETED, {
        deleted,
      });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(HEADS_MESSAGES.HEADS_NOT_DELETED);
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_DELETING_HEADS, {
      error,
    });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createHeads as CREATEHEADS,
  readHeads as READHEADS,
  updateHeads as UPDATEHEADS,
  deleteHeads as DELETEHEADS,
};
