import { HEADSMODEL } from "../../models/headsModel.js";
import { HEADS_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createHeadsDB = async (data) => {
  try {
    const result = await HEADSMODEL(data).save();
    if (result !== null) {
      console.log(HEADS_MESSAGES.HEADS_CREATED, {
        userId: result._id,
      });
      return result;
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_CREATED);
      return false;
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_CREATING_HEADS, (data, error));
    return false;
  }
};

const readHeadsDB = async (query, fields) => {
  try {
    const result = await HEADSMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(HEADS_MESSAGES.HEADS_READ);
      return result;
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_READING_HEADS, {
      query,
      error,
    });
    return false;
  }
};

const updateHeadsDB = async (query, data, fields) => {
  try {
    const result = await HEADSMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(HEADS_MESSAGES.HEADS_UPDATED, {
        userId: result,
      });
      return result;
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_UPDATED, {
        userId: result,
      });
      return false;
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_UPDATING_HEADS, (query, data, error));
    return false;
  }
};

const deleteHeadsDB = async (query) => {
  try {
    const result = await HEADSMODEL.findOneAndDelete(query);

    if (result) {
      console.log(HEADS_MESSAGES.HEADS_DELETED, {
        userId: result._id,
      });
      return result;
    } else {
      console.log(HEADS_MESSAGES.HEADS_NOT_DELETED, {
        userId: result._id,
      });
      return false;
    }
  } catch (error) {
    console.log(HEADS_MESSAGES.ERROR_DELETING_HEADS, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createHeadsDB as CREATEHEADSDB,
  readHeadsDB as READHEADSDB,
  updateHeadsDB as UPDATEHEADSDB,
  deleteHeadsDB as DELETEHEADSDB,
};
