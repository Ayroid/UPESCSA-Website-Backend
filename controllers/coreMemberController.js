import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import {
  COREMEMBER_MESSAGES,
  COMMITTEE_MESSAGES,
  SERVER_MESSAGES,
} from "../utils/messages/messages.js";

// CONSTANTS
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATECOREMEMBERDB,
  READCOREMEMBERDB,
  UPDATECOREMEMBERDB,
  DELETECOREMEMBERDB,
} from "./database/coreMemberDatabase.js";

import {
  READCOMMITTEEDB,
  UPDATECOMMITTEEDB,
} from "./database/committeeDatabase.js";

// CONTROLLERS

const createCoreMember = async (req, res) => {
  try {
    const { name, csaid, committee, linkedInURL } = req.body;
    console.log(req.body.csaid);
    const query = { csaid };

    const memberExists = await READCOREMEMBERDB(query, fields);
    if (memberExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(COREMEMBER_MESSAGES.COREMEMBER_ALREADY_EXISTS);
    }

    const committeeExists = await READCOMMITTEEDB({ committeeName: committee });

    if (committeeExists.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_FOUND);
    }

    const member = await CREATECOREMEMBERDB({
      csaid,
      name,
      linkedInURL,
      committee: committeeExists[0]._id,
    });

    if (member) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_CREATED, { member });

      const committee = await UPDATECOMMITTEEDB(
        { _id: committeeExists[0]._id },
        { $push: { members: member._id } },
        fields
      );

      if (committee) {
        console.log(COMMITTEE_MESSAGES.COMMITTEE_UPDATED, { committee });
        return res.status(StatusCodes.CREATED).send({
          response: COREMEMBER_MESSAGES.COREMEMBER_CREATED,
          memberId: member._id,
        });
      } else {
        console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED, { committee });
        await DELETECOREMEMBERDB({ _id: member._id });
        return res
          .status(StatusCodes.NOT_FOUND)
          .send(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED);
      }
    } else {
      console.log(COREMEMBER_MESSAGES.ERROR_CREATING_COREMEMBER, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_CREATING_COREMEMBER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readCoreMember = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const member = await READCOREMEMBERDB(query, fields);

    if (member.length > 0) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_FOUND, { member });

      return res.status(StatusCodes.OK).send(member);
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_FOUND, { member });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COREMEMBER_MESSAGES.COREMEMBER_NOT_FOUND);
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_READING_COREMEMBER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateCoreMember = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const member = await UPDATECOREMEMBERDB(query, data, fields);
    if (member) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_UPDATED, { member });
      return res.status(StatusCodes.OK).send(member);
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_UPDATED, { member });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COREMEMBER_MESSAGES.COREMEMBER_NOT_UPDATED);
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_UPDATING_COREMEMBER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteCoreMember = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const member = await DELETECOREMEMBERDB(query);
    if (member) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_DELETED, { member });
      return res
        .status(StatusCodes.OK)
        .send(COREMEMBER_MESSAGES.COREMEMBER_DELETED);
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_DELETED, { member });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(COREMEMBER_MESSAGES.COREMEMBER_NOT_DELETED);
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_DELETING_COREMEMBER, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createCoreMember as CREATECOREMEMBER,
  readCoreMember as READCOREMEMBER,
  updateCoreMember as UPDATECOREMEMBER,
  deleteCoreMember as DELETECOREMEMBER,
};
