// IMPORT FILES
const app = require("./app")
const configPort = require("./config/index");
const { getConnection } = require("./utils/connection");
const { updateDb, displayTransactions } = require("./templates/cron");

// CONNECTION TO MONGOOSE
getConnection();

// CRON JOB
updateDb()
displayTransactions()

// CREATE SERVER
const server = app.listen(configPort.SERVER_PORT, () => {
  console.log(`Server: ${configPort.SERVER_PORT}`);
});

// EXPORT SERVER
module.exports = server