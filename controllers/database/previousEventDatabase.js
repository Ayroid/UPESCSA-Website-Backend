import { PREVIOUSEVENTMODEL } from "../../models/previousEventModel.js";
import { EVENT_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createPreviousEventDB = async (data) => {
  try {
    const result = await PREVIOUSEVENTMODEL(data).save();
    if (result !== null) {
      console.log(EVENT_MESSAGES.EVENT_CREATED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_CREATED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_CREATING_EVENT, (data, error));
    return false;
  }
};

const readPreviousEventDB = async (query, fields, quantity, sortQuery) => {
  try {
    const result = await PREVIOUSEVENTMODEL.find(query)
      .sort(sortQuery)
      .select(fields)
      .limit(quantity);

    if (result.length > 0) {
      console.log(EVENT_MESSAGES.EVENT_READ);
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_READING_EVENT, {
      query,
      error,
    });
    return false;
  }
};

const updatePreviousEventDB = async (query, data, fields) => {
  try {
    const result = await PREVIOUSEVENTMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(EVENT_MESSAGES.EVENT_UPDATED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_UPDATED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_UPDATING_EVENT, (query, data, error));
    return false;
  }
};

const deletePreviousEventDB = async (query) => {
  try {
    const result = await PREVIOUSEVENTMODEL.findOneAndDelete(query);

    if (result) {
      console.log(EVENT_MESSAGES.EVENT_DELETED, { eventId: result._id });
      return result;
    } else {
      console.log(EVENT_MESSAGES.EVENT_NOT_DELETED, { eventId: result._id });
      return false;
    }
  } catch (error) {
    console.log(EVENT_MESSAGES.ERROR_DELETING_EVENT, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createPreviousEventDB as CREATEPREVIOUSEVENTDB,
  readPreviousEventDB as READPREVIOUSEVENTDB,
  updatePreviousEventDB as UPDATEPREVIOUSEVENTDB,
  deletePreviousEventDB as DELETEPREVIOUSEVENTDB,
};
