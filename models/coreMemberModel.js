import mongoose from "mongoose";
import moment from "moment-timezone";

const coreMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  csaid: {
    type: String,
    required: true,
  },
  committee: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "committee",
    required: false,
  }],
  linkedInURL: {
    type: String,
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

const coreMemberModel = mongoose.model("coremember", coreMemberSchema);

export { coreMemberModel as COREMEMBERMODEL };
