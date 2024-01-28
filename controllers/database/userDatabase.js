import { USERMODEL } from "../../models/userModel.js";
import { USER_MESSAGES } from "../../utils/messages.js";

// DATABASE OPERATIONS

const createUserDB = async (data) => {
  try {
    const result = await USERMODEL(data).save();
    if (result !== null) {
      console.log(USER_MESSAGES.USER_CREATED, { userId: result._id });
      return result;
    } else {
      console.log(USER_MESSAGES.USER_NOT_CREATED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_CREATING_USER, (data, error));
    return false;
  }
};

const readUserDB = async (
  query,
  fields,
  populateFields,
  populateFieldsSelect
) => {
  try {
    let result;
    if (!fields || !populateFields || !populateFieldsSelect) {
      result = await USERMODEL.find(query);
    } else {
      result = await USERMODEL.find(query)
        .select(fields)
        .populate({
          path: populateFields,
          select: populateFieldsSelect,
        })
        .setOptions({ strictPopulate: false });
    }
    if (result) {
      console.log(USER_MESSAGES.USER_READ, { userId: result[0].email });
      return result;
    } else {
      console.log(USER_MESSAGES.USER_NOT_READ, { userId: result[0].email });
      return false;
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_READING_USER, {
      query,
      error,
    });
    return false;
  }
};

const updateUserDB = async (query, data, fields) => {
  try {
    console.log(query, data);
    const result = await USERMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(USER_MESSAGES.USER_UPDATED, { userId: result });
      return result;
    } else {
      console.log(USER_MESSAGES.USER_NOT_UPDATED, { userId: result });
      return false;
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_UPDATING_USER, (query, data, error));
    return false;
  }
};

const deleteUserDB = async (query) => {
  try {
    const result = await USERMODEL.findOneAndDelete(query);

    if (result) {
      console.log(USER_MESSAGES.USER_DELETED, { userId: result._id });
      return result;
    } else {
      console.log(USER_MESSAGES.USER_NOT_DELETED, { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log(USER_MESSAGES.ERROR_DELETING_USER, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createUserDB as CREATEUSERDB,
  readUserDB as READUSERDB,
  updateUserDB as UPDATEUSERDB,
  deleteUserDB as DELETEUSERDB,
};
