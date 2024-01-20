const mongoose = require("mongoose");

const eventFormSchema = new mongoose.Schema({

yearOfStudy: {
    type: Number,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  sapId: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// ----------------- CREATING MODEL -----------------
const eventForm = mongoose.model("eventFormSchema", eventFormSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  EVENTFORM: eventForm,
};