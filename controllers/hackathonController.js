import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";

// CONSTANTS
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  UPDATEHACKATHONDB,
  READHACKATHONDB,
} from "./database/hackathonDatabase.js";

// CONTROLLERS

const readPS = async (req, res) => {
  try {
    const query = {};
    const data = await READHACKATHONDB(query, fields);
    if (data) {
      console.log("Problem Statement Read", { data });
      return res.status(StatusCodes.OK).send(data);
    } else {
      console.log("Problem Statement Not Found", { data });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Problem Statement Not Found");
    }
  } catch (error) {
    console.log("Error reading PS", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updatePS = async (req, res) => {
  try {
    const query = { PSId: req.params.id };
    const data = req.body;
    const updated = await UPDATEHACKATHONDB(query, data, fields);
    if (updated) {
      console.log("Problem Statement Updated", { updated });
      return res.status(StatusCodes.OK).send(updated);
    } else {
      console.log("Problem Statement Not Updated", { updated });
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Problem Statement Not Updated");
    }
  } catch (error) {
    console.log("Error updating PS", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export { updatePS as UPDATEPS, readPS as READPS };
