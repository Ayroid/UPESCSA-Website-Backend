import mongoose from "mongoose";
import moment from "moment-timezone";

const headsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  csaid: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  committee: {
    type: String,
    required: true,
  },
  linkedInURL: {
    type: String,
    required: false,
  },
  headImgURL: {
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

const headsModel = mongoose.model("heads", headsSchema);

export { headsModel as HEADSMODEL };
