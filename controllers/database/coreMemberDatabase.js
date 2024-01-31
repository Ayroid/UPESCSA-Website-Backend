import { COREMEMBERMODEL } from "../../models/coreMemberModel.js";
import { COREMEMBER_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createCoreMemberDB = async (data) => {
  try {
    const result = await COREMEMBERMODEL(data).save();
    if (result !== null) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_CREATED, {
        userId: result._id,
      });
      return result;
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_CREATED);
      return false;
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_CREATING_COREMEMBER, (data, error));
    return false;
  }
};

const readCoreMemberDB = async (query, fields) => {
  try {
    const result = await COREMEMBERMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_READ);
      return result;
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_READING_COREMEMBER, {
      query,
      error,
    });
    return false;
  }
};

const updateCoreMemberDB = async (query, data, fields) => {
  try {
    const result = await COREMEMBERMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_UPDATED, { userId: result });
      return result;
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_UPDATED, {
        userId: result,
      });
      return false;
    }
  } catch (error) {
    console.log(
      COREMEMBER_MESSAGES.ERROR_UPDATING_COREMEMBER,
      (query, data, error)
    );
    return false;
  }
};

const deleteCoreMemberDB = async (query) => {
  try {
    const result = await COREMEMBERMODEL.findOneAndDelete(query);

    if (result) {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_DELETED, {
        userId: result._id,
      });
      return result;
    } else {
      console.log(COREMEMBER_MESSAGES.COREMEMBER_NOT_DELETED, {
        userId: result._id,
      });
      return false;
    }
  } catch (error) {
    console.log(COREMEMBER_MESSAGES.ERROR_DELETING_COREMEMBER, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createCoreMemberDB as CREATECOREMEMBERDB,
  readCoreMemberDB as READCOREMEMBERDB,
  updateCoreMemberDB as UPDATECOREMEMBERDB,
  deleteCoreMemberDB as DELETECOREMEMBERDB,
};
