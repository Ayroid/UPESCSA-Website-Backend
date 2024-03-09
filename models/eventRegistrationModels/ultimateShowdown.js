import mongoose from "mongoose";
import moment from "moment-timezone";

const ultimateShowdonwSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sapID: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
  },

  CSAMember: {
    type: String,
    required: true,
    default: "No",
  },
  CSAID: {
    type: String,
    required: false,
    default: "-",
  },
  transactionID: {
    type: String,
    required: true,
  },
  transactionSS: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate(),
    required: true,
  },
  updated_at: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate(),
    required: false,
  },
});

const ultimateShowDownModel = mongoose.model(
  "ultimateShowdonw",
  ultimateShowdonwSchema
);

export { ultimateShowDownModel as ULTIMATESHOWDOWNMODEL };
