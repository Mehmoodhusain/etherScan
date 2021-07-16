// IMPORT FILES
const { USER } = require("../models/user");

async function dashboard(req, res) {
  const user = await USER.findById(req.user._id).select(
    "firstName lastName email balance"
  );
  if (!user)
    return res.status(404).send({
      Message: "Record not found in database...",
      Code: 404,
      Data: "Not available",
    });
  res.send({
    Message: "Success",
    Code: 200,
    Data: user,
  });
}
module.exports = { dashboard };
