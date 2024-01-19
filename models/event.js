const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default:Date.now(),
  },
  image_url_array: {
    type: list,
    required: true,
  },
});

// ----------------- CREATING MODEL -----------------
const event = mongoose.model("eventSchema", eventSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  EVENT: eventModel,
};