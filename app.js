// IMPORT FILES
const user = require("./routes/routes");
const error = require("./middleware/error");

// IMPORT LIBRARIES
const express = require("express");

const app = express();

// PIPELINE
app.use(express.json());
app.use("/api/user/", user);
app.use(error);

// EXPORT
module.exports = app