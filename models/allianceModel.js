import mongoose from "mongoose";
import moment from "moment-timezone";

const allianceSchema = new mongoose.Schema({
  allianceName: {
    type: String,
    required: true,
  },
  allianceImageURL: {
    type: String,
    required: true,
  },
  allianceWebsiteURL: {
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

const allianceModel = mongoose.model("alliance", allianceSchema);

export { allianceModel as ALLIANCEMODEL };
