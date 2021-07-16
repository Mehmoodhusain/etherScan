// IMPORT FILES
const { USER } = require("../models/user");
const { TRANSACTION } = require("../models/transaction");
const { ETHER } = require("../models/etherSchema");

async function transaction(req, res) {
  const user = await USER.findById(req.user._id).select(
    "firstName lastName email balanceEther balanceDollar"
  );
  if (!user)
    return res.status(404).send({
      Message: "Sender not found in database...",
      Code: 404,
      Data: "Not available",
    });


    const ether = await ETHER.findById("60cb11caf0d6a2c691707135").select(
        "value"
      );
      if (!ether)
        return res.status(404).send({
          Message: "Currency rate not found in database...",
          Code: 404,
          Data: "Not available",
        });
    
  const receiver = await USER.findById(req.body.receiver).select(
    "firstName lastName email  balanceEther balanceDollar"
  );
  if (!receiver)
    return res.status(404).send({
      Message: "Receiver not found in database...",
      Code: 404,
      Data: "Not available",
    });

  if (req.body.receiver == user._id)
    return res.status(404).send({
      Message: "You cannot transfer from this account to this account...",
      Code: 404,
      Data: "Not available",
    });
  if (user.balanceDollar >= req.body.dollars) {
    user.balanceDollar -= req.body.dollars;
    user.balanceEther -= req.body.dollars/ether.value
    
    receiver.balanceDollar += req.body.dollars;
    receiver.balanceEther += req.body.dollars/ether.value

    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    const transfer = new TRANSACTION({
      from: user._id,
      to: receiver._id,
      status: "Success",
      timeStamp: dateTime,
      dollar: req.body.dollars,
      ether: req.body.dollars/ether.value,
    });
    //user.transactions.push(transfer);
    await user.save();
    await receiver.save();
    await transfer.save();
    return res.send({
      Message: "Success",
      Code: 200,
      Data: { transaction: user },
    });
  }
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  const transfer = new TRANSACTION({
    from: user._id,
    to: receiver._id,
    status: "Failed",
    timeStamp: dateTime,
    dollar: req.body.dollars,
    ether: req.body.dollars/ether.value,
  });
  //user.transactions.push(transfer);
  //await user.save();
  await transfer.save();
  res.send({
    Message: "Failure",
    Code: 401,
    Data: "Insufficient Balance...",
  });
}
module.exports = { transaction };
