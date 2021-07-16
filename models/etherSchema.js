// IMPORT LIBRARIES
const mongoose = require("mongoose");

const etherSchema = new mongoose.Schema({
  value: {
    type: Number,
  }
});

const ETHER = mongoose.model("etherValue", etherSchema);
exports.ETHER = ETHER;
exports.etherSchema = etherSchema
