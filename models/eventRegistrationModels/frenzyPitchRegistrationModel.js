import mongoose from "mongoose";
import moment from "moment-timezone";

const frenzyPitchSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamSize: {
    type: String,
    required: true,
  },
  teamLeadName: {
    type: String,
    required: true,
  },
  teamLeadEmail: {
    type: String,
    required: true,
  },
  teamLeadPhone: {
    type: String,
    required: true,
  },
  teamLeadCourse: {
    type: String,
    required: true,
  },
  teamLeadYearOfStudy: {
    type: String,
    required: true,
  },
  teamLeadSapID: {
    type: String,
    required: true,
  },
  teamLeadCSAMember: {
    type: String,
    required: true,
    default: "No",
  },
  teamLeadCSAID: {
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
  memberThreeName: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeEmail: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreePhone: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeCourse: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeYearOfStudy: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeSapID: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeCSAMember: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeCSAID: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourName: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourEmail: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourPhone: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourCourse: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourYearOfStudy: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourSapID: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourCSAMember: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourCSAID: {
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

const frenzyPitchModel = mongoose.model("frenzyPitch", frenzyPitchSchema);

export { frenzyPitchModel as FRENZYPITCHMODEL };
