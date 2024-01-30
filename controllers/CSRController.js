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
    const query = { csrYear };

    const csrExists = await READCSRDB(query, fields);
    if (csrExists.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .send(CSR_MESSAGES.CSR_ALREADY_EXISTS);
    }

    const csrImageURL = `${SERVER_URI}/images/csr/${req.files["csrImg"][0].filename}`;

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

const deleteCSR = async (req, res) => {
  res.send("deleteCRS");
};

const updateCSR = async (req, res) => {
  res.send("updateCRS");
};

const getCSR = async (req, res) => {
  res.send("getCRS");
};

export {
  createCSR as CREATECSR,
  getCSR as GETCSR,
  updateCSR as UPDATECSR,
  deleteCSR as DELETECSR,
};
