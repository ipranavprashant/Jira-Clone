const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeename: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [
      true,
      "The email is already associated with the organisation, either change you email or proceed to signing in!",
    ],
  },
  role: {
    type: String,
    enum: ["Manager", "Engineer"],
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
