import { ALLIANCEMODEL } from "../../models/allianceModel.js";
import { ALLIANCE_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createAllianceDB = async (data) => {
  try {
    const result = await ALLIANCEMODEL(data).save();
    if (result !== null) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_CREATED, {
        userId: result._id,
      });
      return false;
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_CREATING_ALLIANCE, (data, error));
    return false;
  }
};

const readAllianceDB = async (query, fields) => {
  try {
    const result = await ALLIANCEMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_READ);
      return result;
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_READING_ALLIANCE, {
      query,
      error,
    });
    return false;
  }
};

const updateAllianceDB = async (query, data, fields) => {
  try {
    const result = await ALLIANCEMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_UPDATED, { userId: result });
      return result;
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(
      ALLIANCE_MESSAGES.ERROR_UPDATING_ALLIANCE,
      (query, data, error)
    );
    return false;
  }
};

const deleteAllianceDB = async (query) => {
  try {
    const result = await ALLIANCEMODEL.findOneAndDelete(query);

    if (result) {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(ALLIANCE_MESSAGES.ALLIANCE_NOT_DELETED, {
        userId: result._id,
      });
      return false;
    }
  } catch (error) {
    console.log(ALLIANCE_MESSAGES.ERROR_DELETING_ALLIANCE, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createAllianceDB as CREATEALLIANCEDB,
  readAllianceDB as READALLIANCEDB,
  updateAllianceDB as UPDATEALLIANCEDB,
  deleteAllianceDB as DELETEALLIANCEDB,
};
