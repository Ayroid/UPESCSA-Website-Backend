import mongoose from "mongoose";
import moment from "moment-timezone";

const psSchema = new mongoose.Schema({
  PSId: {
    type: String,
    required: true,
  },
  PSActive: {
    type: Boolean,
    required: true,
  },
  PSSectorDomain: {
    type: String,
    required: true,
  },
  PSOrganization: {
    type: String,
  },
  PSTitle: {
    type: String,
    required: true,
  },
  PSDescription: {
    type: String,
    required: true,
  },
  PSFunctionalRequirement: {
    type: Array,
  },
  PSNonFunctionalRequirement: {
    type: Array,
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

const psModel = mongoose.model("hackathonps", psSchema);

export { psModel as PSMODEL };
