// IMPORT FILES
const config = require("../config/index");

// IMPORT LIBRARIES
const mongoose = require("mongoose");

// CONNECTION TO MONGOOSE
module.exports = {
  getConnection: function () {
    const dbUri = config.MONGO_URI;
    mongoose.connect(dbUri);
    mongoose.connection.on("connected", function () {
      console.log("Mongoose default connection open to " + dbUri);
    });
    mongoose.connection.on("error", function (err) {
      console.log("Mongoose default connection error: "); //+ err.message
    });
    mongoose.connection.on("disconnected", function () {
      console.log("Mongoose default connection disconnected");
    });
  }  
};
