// IMPORT FILES
const { ETHER } = require("../models/etherSchema");

async function etherValue(req, res) {
  let oldEther = await ETHER.find()
  if(oldEther){
    return res.status(400).send({
      Message: "Already Exists",
      Code: 400,
      Data: "Not available",
    });
  }  
  ether = new ETHER({
        value: req.body.value,
      });
      try {
        ether = await ether.save();
        return res.status(200).send({
          Message: "Success",
          Code: 200,
          Data: ether
        });
      } catch (ex) {
        return res.status(400).send({
          Message: ex.message,
          Code: 400,
          Data: "Not available",
        });
      }
}
module.exports = { etherValue };
