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


const createCSR = async (req,res) => {
    res.send("createCRS");
}

const deleteCSR = async (req,res) => {
    res.send("deleteCRS");
};

const updateCSR = async (req,res) => {
    res.send("updateCRS");
};

const getCSR = async (req,res) => {
    res.send("getCRS");
};

export {
    createCSR as CREATECSR,
    getCSR as GETCSR,
    updateCSR as UPDATECSR,
    deleteCSR as DELETECSR,
};