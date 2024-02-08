import mongoose from "mongoose";
import moment from "moment-timezone";

const previousEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  eventYear: {
    type: String,
    required: false,
  },
  spanx: {
    type: String,
    required: false,
    default: "span 1",
  },
  spany: {
    type: String,
    required: false,
    default: "span 1",
  },
  createdAt: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: () => moment().tz("Asia/Kolkata").toDate(),
    required: false,
  },
});

const previousEventModel = mongoose.model("previousevent", previousEventSchema);

export { previousEventModel as PREVIOUSEVENTMODEL };
