import mongoose from "mongoose";
import moment from "moment-timezone";

const hackerSummitSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
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
  upesStudent: {
    type: Boolean,
    required: true,
  },
  collegeName: {
    type: String,
    required: false,
  },
  sapID: {
    type: String,
    required: false,
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

const hackerSummitModel = mongoose.model("hackerSummit", hackerSummitSchema);

export { hackerSummitModel as HACKERSUMMITMODEL };
