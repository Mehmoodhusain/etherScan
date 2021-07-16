// IMPORT FILES
const { etherSchema } = require("./etherSchema");
const { transactionSchema } = require("./transaction");

// IMPORT LIBRARIES
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 14,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repeat_password: {
    type: String,
  },
  country: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
  },
  balanceEther: {
    type: Number,
    required: true,
  },
  balanceDollar: {
    type: Number,
    required: true,
  },
});

const USER = mongoose.model("User", userSchema);
exports.USER = USER;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 15,
//   },
//   lastName: {
//     type: String,
//     required: true,
//     minlength: 3,
//     maxlength: 15,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//     minlength: 11,
//     maxlength: 14,
//   },
//   dob: {
//     type: Date,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   repeat_password: {
//     type: String,
//   },
//   country: {
//     type: String,
//     required: true,
//     minlength: 8,
//     maxlength: 8,
//   },
//   twoFactor: {
//     type: Boolean,
//   },
//   authToken: {
//     type: String,
//   },
//   emailOtpId:{
//     type: String
//   },
//   smsOtpId:{
//     type: String
//   }
// });

// const User = mongoose.model("User", userSchema);
// exports.User = User;
