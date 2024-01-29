import mongoose from "mongoose";
import moment from "moment-timezone";

const coreMemberSchema = new mongoose.Schema({
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
  committeeHeads: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "headsandmanagement",
    required: false,
  },
  committeeMembers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coremember",
    required: false,
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

const coreMemberModel = mongoose.model("committee", coreMemberSchema);

export { coreMemberModel as COREMEMBERMODEL };
