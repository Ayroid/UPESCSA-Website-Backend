import mongoose from "mongoose";
import moment from "moment-timezone";

const committeeSchema = new mongoose.Schema({
  committeeName: {
    type: String,
    required: true,
  },
  committeeDescription: {
    type: String,
    required: true,
  },
  committeeImageURL: {
    type: String,
    required: false,
  },
  committeePageURL: {
    type: String,
    required: false,
  },
  committeeHeads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "heads",
      required: false,
    },
  ],
  committeeMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coremember",
      required: false,
    },
  ],
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

const committeeModel = mongoose.model("committee", committeeSchema);

export { committeeModel as COMMITTEEMODEL };
