import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import { CSR_MESSAGES, SERVER_MESSAGES } from "../utils/messages/messages.js";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATECSRDB,
  UPDATECSRDB,
  DELETECSRDB,
  READCSRDB,
} from "./database/csrDatabase.js";

// CONTROLLERS

const createCSR = async (req, res) => {
  try {
    const { csrYear } = req.body;
    const csrImageURL = `${SERVER_URI}/images/csr/${req.files["csrImg"][0].filename}`;

    const query = { csrImageURL };

    const csrExists = await READCSRDB(query, fields);
    if (csrExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(CSR_MESSAGES.CSR_ALREADY_EXISTS);
    }

    const csr = await CREATECSRDB({
      csrYear,
      csrImageURL,
    });

    if (csr) {
      console.log(CSR_MESSAGES.CSR_CREATED, { csr });
      return res.status(StatusCodes.CREATED).send({
        response: CSR_MESSAGES.CSR_CREATED,
        csrId: csr._id,
      });
    } else {
      console.log(CSR_MESSAGES.ERROR_CREATING_CSR, { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_CREATING_CSR, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const readCSR = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const csr = await READCSRDB(query, fields);

    if (csr.length > 0) {
      console.log(CSR_MESSAGES.CSR_FOUND, { csr });

      return res.status(StatusCodes.OK).send(csr);
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_FOUND, { csr });
      return res.status(StatusCodes.NOT_FOUND).send(CSR_MESSAGES.CSR_NOT_FOUND);
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_READING_CSR, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateCSR = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const updated = await UPDATECSRDB(query, data, fields);
    if (updated) {
      console.log(CSR_MESSAGES.CSR_UPDATED, { updated });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_UPDATED, { updated });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(CSR_MESSAGES.CSR_NOT_UPDATED);
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_UPDATING_CSR, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteCSR = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const deleted = await DELETECSRDB(query);
    if (deleted) {
      console.log(CSR_MESSAGES.CSR_DELETED, { deleted });
      return res.status(StatusCodes.OK).send(CSR_MESSAGES.CSR_DELETED);
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_DELETED, { deleted });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(CSR_MESSAGES.CSR_NOT_DELETED);
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_DELETING_CSR, { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(SERVER_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export {
  createCSR as CREATECSR,
  readCSR as READCSR,
  updateCSR as UPDATECSR,
  deleteCSR as DELETECSR,
};
