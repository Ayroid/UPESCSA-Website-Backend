import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  COMMITTEE_MESSAGES,
  SERVER_MESSAGES,
} from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
let fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATECOMMITTEEDB,
  READALLCOMMITTEEDB,
  READCOMMITTEEDB,
  UPDATECOMMITTEEDB,
  DELETECOMMITTEEDB,
} from "./database/committeeDatabase.js";

// CONTROLLERS

const createCommittee = async (req, res) => {
  try {
    const { committeeName, committeeDescription, committeePageURL } = req.body;
    const query = { committeeName };

    const committeeExists = await READCOMMITTEEDB(query, fields);
    if (committeeExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(COMMITTEE_MESSAGES.COMMITTEE_ALREADY_EXISTS);
    }

    const committeeImageURL = `${SERVER_URI}/images/committee/${req.files["committeeImg"][0].filename}`;

    const committee = await CREATECOMMITTEEDB({
      committeeName,
      committeeDescription,
      committeePageURL,
      committeeImageURL,
    });

    if (committee) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_CREATED, { committee });
      return res.status(StatusCodes.CREATED).send({
        response: COMMITTEE_MESSAGES.COMMITTEE_CREATED,
        committeeId: committee._id,
      });
    } else {
      console.log(COMMITTEE_MESSAGES.ERROR_CREATING_COMMITTEE, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_CREATING_COMMITTEE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readAllCommittees = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    fields = {
      __v: 0,
      _id: 1,
      committeeDescription: 0,
      committeeHeads: 0,
      committeeMembers: 0,
      createdAt: 0,
      updatedAt: 0,
    };
    const committees = await READALLCOMMITTEEDB(query, fields);

    if (committees.length > 0) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_FOUND, { committees });

      return res.status(StatusCodes.OK).send(committees);
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND, { committees });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND);
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_READING_COMMITTEE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readCommittee = async (req, res) => {
  try {
    console.log("Read");
    const query = !req.query.committeeName
      ? {}
      : { committeeName: req.query.committeeName };
    const committee = await READCOMMITTEEDB(query, fields);

    if (committee.length > 0) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_FOUND, { committee });
      return res.status(StatusCodes.OK).send(committee);
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND, { committee });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND);
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_READING_COMMITTEE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateCommittee = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const committee = await UPDATECOMMITTEEDB(query, data, fields);
    if (committee) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_UPDATED, { committee });
      return res.status(StatusCodes.OK).send(committee);
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED, { committee });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED);
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_UPDATING_COMMITTEE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteCommittee = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const committee = await DELETECOMMITTEEDB(query);
    if (committee) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_DELETED, { committee });
      return res
        .status(StatusCodes.OK)
        .send(COMMITTEE_MESSAGES.COMMITTEE_DELETED);
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_DELETED, { committee });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_DELETED);
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_DELETING_COMMITTEE, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createCommittee as CREATECOMMITTEE,
  readCommittee as READCOMMITTEE,
  readAllCommittees as READALLCOMMITTEES,
  updateCommittee as UPDATECOMMITTEE,
  deleteCommittee as DELETECOMMITTEE,
};
