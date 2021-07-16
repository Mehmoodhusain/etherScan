// IMPORT FILES
const { ETHER } = require("../models/etherSchema");
const { USER } = require("../models/user");
const { TRANSACTION } = require("../models/transaction");

// IMPORT LIBRARIES
const cron = require("node-cron");

module.exports = {
  updateDb: function () {
    let task = cron.schedule(
      "*/30 * * * * *",
      async function () {
        var ether = await ETHER.findById("60cb11caf0d6a2c691707135").select(
          "value"
        );
        if (!ether)
          return res.status(404).send({
            Message: "Currency rate not found in database...",
            Code: 404,
            Data: "Not available",
          });

        let users = await USER.find({});
        if (!users)
          return res.status(404).send({
            Message: "Users not found in database...",
            Code: 404,
            Data: "Not available",
          });

        users.map((x) => {
          try {
            abc(x);
            async function abc(x) {
              let user = await USER.findById(x._doc._id);
              if (!user) {
                console.log("failed");
              } else {
                user.balanceDollar = user.balanceEther * ether.value;
                await user.save();
              }
            }
          } catch (ex) {
            console.log(ex.message);
          }
        });
      },
      {
        scheduled: true,
      }
    );
  },
  displayTransactions: function () {
    let task = cron.schedule('*/60 * * * * *', async function () {
            const result = await TRANSACTION.find().sort({_id:-1}).limit(5)
            result.forEach(x => {
                console.log(x._doc)
            });
            console.log("//////////////////////////////////////////////")
            console.log("\n\n")
      }, {
        scheduled: true,
      });
  },
};
