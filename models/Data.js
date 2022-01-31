const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");

const dataSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter a username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter a valid email address"],
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: [true, "Please enter mobile number"],
    length: [10, "Enter 10 digit mobile number"],
  },
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
