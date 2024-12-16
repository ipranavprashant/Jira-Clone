const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  severity: {
    type: String,
    enum: ["Low", "Med", "High", "No"],
  },
  employee: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In Process", "In Review", "Done"],
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Issue", IssueSchema);
