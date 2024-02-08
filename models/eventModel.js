import mongoose from "mongoose";
import moment from "moment-timezone";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventActive: {
    type: Boolean,
    required: true,
  },
  eventMode: {
    type: String,
    required: true,
  },
  eventTeamSize: {
    type: Number,
    required: true,
  },
  eventDateTime: {
    type: String,
    required: true,
  },
  eventFormURL: {
    type: String,
    required: true,
  },
  eventImgURL: {
    type: String,
    required: true,
  },
  eventRegistrationStart: {
    type: String,
    required: true,
  },
  eventRegistrationEnd: {
    type: String,
    required: true,
  },
  eventRegistrationTime: {
    type: String,
    required: true,
  },
  eventRegistrationData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventRegistration",
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

const eventModel = mongoose.model("event", eventSchema);

export { eventModel as EVENTMODEL };
