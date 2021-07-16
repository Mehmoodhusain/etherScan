// IMPORT LIBRARIES
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  timeStamp: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  ether: {
    type: Number,
  },
  dollar: {
    type: Number,
  },
  
});

const TRANSACTION = mongoose.model("Transaction", transactionSchema);
exports.TRANSACTION = TRANSACTION;
exports.transactionSchema = transactionSchema
