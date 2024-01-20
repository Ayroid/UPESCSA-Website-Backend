const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({

  imgUrl: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: true,
  },
});

// ----------------- CREATING MODEL -----------------
const blogs = mongoose.model("blogsSchema", blogsSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  BLOGS: blogsModel,
};