import mongoose from "mongoose";
import moment from "moment-timezone";

const previousEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventImageURL: {
    type: String,
    required: true,
  },
  eventYear: {
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

const previousEventModel = mongoose.model(
  "previousevent",
  previousEventSchema
);

export { previousEventModel as PREVIOUSEVENTMODEL };
