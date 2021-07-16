// IMPORT FILES
const config = require("../config/index");

// IMPORT LIBRARIES
const jwt = require("jsonwebtoken");
module.exports = {
  jwtToken: function (key) {
    const token = jwt.sign({ _id: key }, config.tokenKey, { expiresIn: "15h" });
    return token;
  },
  twoFactorAuthenticationToken: function (key) {
    const token = jwt.sign({ _id: key }, config.twoFactorAuthenticationKey, {
      expiresIn: "3h",
    });
    return token;
  },
  passwordToken: function (key) {
    const token = jwt.sign({ _id: key }, config.passwordKey, {
      expiresIn: "3h",
    });
    return token;
  },
  verifySmsToken: function (key) {
    const token = jwt.sign({ _id: key }, config.verifySmsKey, {
      expiresIn: "3h",
    });
    return token;
  },
};
