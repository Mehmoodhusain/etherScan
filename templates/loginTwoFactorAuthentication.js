// IMPORT FILES
const { twoFactorAuthenticationToken } = require("./tokenGenerator");

// IMPORT LIBRARIES
const bcrypt = require("bcrypt");

module.exports = {
  twoFactorAuthentication: async function (
    user,
    reqBodyPassword,
    userPassword,
    res
  ) {
    const validPassword = await bcrypt.compare(reqBodyPassword, userPassword); // verification of password
    if (!validPassword)
      return res.status(400).send({
        Message: "incorrect password",
        Code: 400,
        Data: "Not available",
      });
    const token = twoFactorAuthenticationToken(user._id); // generate temporary token

    return res.send({
      Message: "Success",
      Code: 200,
      Data: { tempToken: token },
    });
  },
};
