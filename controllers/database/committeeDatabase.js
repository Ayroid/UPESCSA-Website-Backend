import { COMMITTEEMODEL } from "../../models/committeeModel.js";
import { COMMITTEE_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createCommitteeDB = async (data) => {
  try {
    const result = await COMMITTEEMODEL(data).save();
    if (result !== null) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_CREATED);
      return false;
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_CREATING_COMMITTEE, (data, error));
    return false;
  }
};

const readCommitteeDB = async (query, fields) => {
  try {
    const result = await COMMITTEEMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_READ);
      return result;
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_READING_COMMITTEE, {
      query,
      error,
    });
    return false;
  }
};

const updateCommitteeDB = async (query, data, fields) => {
  try {
    const result = await COMMITTEEMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_UPDATED, { userId: result });
      return result;
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(
      COMMITTEE_MESSAGES.ERROR_UPDATING_COMMITTEE,
      (query, data, error)
    );
    return false;
  }
};

const deleteCommitteeDB = async (query) => {
  try {
    const result = await COMMITTEEMODEL.findOneAndDelete(query);

    if (result) {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(COMMITTEE_MESSAGES.COMMITTEE_NOT_DELETED, {
        userId: result._id,
      });
      return false;
    }
  } catch (error) {
    console.log(COMMITTEE_MESSAGES.ERROR_DELETING_COMMITTEE, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createCommitteeDB as CREATECOMMITTEEDB,
  readCommitteeDB as READCOMMITTEEDB,
  updateCommitteeDB as UPDATECOMMITTEEDB,
  deleteCommitteeDB as DELETECOMMITTEEDB,
};
