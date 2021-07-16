// IMPORT FILES
const { TRANSACTION } = require("../models/transaction");
const { USER } = require("../models/user");

async function search(req, res) {
  const user = await USER.findById({_id: req.body.id }).select("-password")
  if (!user)
    return res.status(404).send({
      Message: "User not found in database...",
      Code: 404,
      Data: "Not available",
    });

    const transactions = await TRANSACTION.find({from: req.body.id })
    if (!transactions)
      return res.status(404).send({
        Message: "Record not found in database...",
        Code: 404,
        Data: "Not available",
      });
  


  res.send({
    Message: "Success",
    Code: 200,
    User: user,
    Transactions : transactions,
  });
}
module.exports = { search };
