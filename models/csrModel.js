import mongoose from "mongoose";
import moment from "moment-timezone";

const csrSchema = new mongoose.Schema({
  csrName: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  spanx: {
    type: String,
    required: true,
  },
  spany: {
    type: String,
    required: true,
  },
  created_at: {
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

const csrModel = mongoose.model("csr", csrSchema);

export { csrModel as CSRMODEL };
