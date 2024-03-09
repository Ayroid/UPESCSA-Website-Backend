import mongoose from "mongoose";
import moment from "moment-timezone";

const virtualEscapeRoomSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamSize: {
    type: String,
    required: true,
  },
  memberOneName: {
    type: String,
    required: true,
  },
  memberOneEmail: {
    type: String,
    required: true,
  },
  memberOnePhone: {
    type: String,
    required: true,
  },
  memberOneCourse: {
    type: String,
    required: true,
  },
  memberOneYearOfStudy: {
    type: String,
    required: true,
  },
  memberOneSapID: {
    type: String,
    required: true,
  },
  memberOneCSAMember: {
    type: String,
    required: true,
    default: "No",
  },
  memberOneCSAID: {
    type: String,
    required: false,
    default: "-",
  },
  memberTwoName: {
    type: String,
    required: true,
  },
  memberTwoEmail: {
    type: String,
    required: true,
  },
  memberTwoPhone: {
    type: String,
    required: true,
  },
  memberTwoCourse: {
    type: String,
    required: true,
  },
  memberTwoYearOfStudy: {
    type: String,
    required: true,
  },
  memberTwoSapID: {
    type: String,
    required: true,
  },
  memberTwoCSAMember: {
    type: String,
    required: true,
    default: "No",
  },
  memberTwoCSAID: {
    type: String,
    required: false,
    default: "-",
  },
  transactionID: {
    type: String,
    required: true,
  },
  transactionSS: {
    type: String,
    required: true,
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

const virtualEscapeRoomModel = mongoose.model("virtualEscapeRoom", virtualEscapeRoomSchema);

export { virtualEscapeRoomModel as VIRTUALESCAPEROOMMODEL };
