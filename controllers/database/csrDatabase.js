import { CSRMODEL } from "../../models/csrModel.js";
import { CSR_MESSAGES } from "../../utils/messages/messages.js";

// DATABASE OPERATIONS

const createCSRDB = async (data) => {
  try {
    const result = await CSRMODEL(data).save();
    if (result !== null) {
      console.log(CSR_MESSAGES.CSR_CREATED, { csrId: result._id });
      return result;
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_CREATED, { csrId: result._id });
      return false;
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_CREATING_CSR, (data, error));
    return false;
  }
};

const readCSRDB = async (query, fields) => {
  try {
    const result = await CSRMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log(CSR_MESSAGES.CSR_READ);
      return result;
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_READ);
      return false;
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_READING_CSR, {
      query,
      error,
    });
    return false;
  }
};

const updateCSRDB = async (query, data, fields) => {
  try {
    const result = await CSRMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log(CSR_MESSAGES.CSR_UPDATED, { csrId: result });
      return result;
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_UPDATED, { csrId: result });
      return false;
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_UPDATING_CSR, (query, data, error));
    return false;
  }
};

const deleteCSRDB = async (query) => {
  try {
    const result = await CSRMODEL.findOneAndDelete(query);

    if (result) {
      console.log(CSR_MESSAGES.CSR_DELETED, { csrId: result._id });
      return result;
    } else {
      console.log(CSR_MESSAGES.CSR_NOT_DELETED, { csrId: result._id });
      return false;
    }
  } catch (error) {
    console.log(CSR_MESSAGES.ERROR_DELETING_CSR, (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createCSRDB as CREATECSRDB,
  updateCSRDB as UPDATECSRDB,
  deleteCSRDB as DELETECSRDB,
  readCSRDB as READCSRDB,
};
