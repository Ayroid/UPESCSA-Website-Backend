import mongoose from "mongoose";
import moment from "moment-timezone";

const hackathonSchema = new mongoose.Schema({
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
  teamLeadUPESStudent: {
    type: String,
    required: true,
    default: "Yes",
  },
  teamLeadCollegeName: {
    type: String,
    required: false,
    default: "UPES",
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
  memberTwoUPESStudent: {
    type: String,
    required: true,
    default: "Yes",
  },
  memberTwoCollegeName: {
    type: String,
    required: false,
    default: "UPES",
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
  memberThreeUPESStudent: {
    type: String,
    required: false,
    default: "Yes",
  },
  memberThreeCollegeName: {
    type: String,
    required: false,
    default: "UPES",
  },
  memberThreeSapID: {
    type: String,
    required: false,
    default: "-",
  },
  memberThreeCSAMember: {
    type: String,
    required: false,
    default: "No",
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
  memberFourUPESStudent: {
    type: String,
    required: false,
    default: "Yes",
  },
  memberFourCollegeName: {
    type: String,
    required: false,
    default: "UPES",
  },
  memberFourSapID: {
    type: String,
    required: false,
    default: "-",
  },
  memberFourCSAMember: {
    type: String,
    required: false,
    default: "No",
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

const hackathonModel = mongoose.model("hackathon", hackathonSchema);

export { hackathonModel as HACKATHONMODEL };
