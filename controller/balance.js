// IMPORT FILES
const {
  USER
} = require("../models/user");
const {
  ETHER
} = require("../models/etherSchema");

// ROUTE FUNCTION
module.exports = {
  balance: async function (req, res) {
    let ether = await ETHER.find();
    if (!ether)
      return res.status(404).send({
        Message: "An Error Occured...",
        Code: 404,
        Details: "Currency rate not found in database...",
      });
    let user = await USER.findById(req.body.id)
    if (!user)
      return res.status(404).send({
        Message: "An Error Occured...",
        Code: 404,
        Details: "Could not find the record in database...",
      });
    user.balanceEther += req.body.balanceEther
    console.log(user.balanceEther)
    let dollar = user.balanceEther * ether[0]._doc.value
    console.log(dollar)
    user.balanceDollar = dollar
    console.log(user.balanceDollar)
    user = await user.save()
    res.send({
      Message: "Success",
      Code: 200,
      Details: user,
    });
  }
};