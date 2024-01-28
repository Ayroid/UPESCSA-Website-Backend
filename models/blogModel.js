import mongoose from "mongoose";
import moment from "moment-timezone";

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogAuthor: {
    type: String,
    required: true,
  },
  blogSummary: {
    type: String,
    required: true,
  },
  blogImageURL: {
    type: String,
    required: true,
  },
  blogURL: {
    type: String,
    required: true,
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

const blogModel = mongoose.model("blogs", blogSchema);

export { blogModel as BLOGMODEL };
