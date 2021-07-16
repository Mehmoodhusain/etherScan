// IMPORT FILES
const config = require("../config/index");

// IMPORT LIBRARIES
const jwt = require("jsonwebtoken");

module.exports = {
  jwtVerification: function (req, res, next) {
    const token = req.header("jwt");
    if (!token)
      return res.status(401).send({
        Message: "No Token Found",
        Code: 401,
        Data: "Not available",
      });
    try {
      const decoded = jwt.verify(token, config.tokenKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send({
        Message: ex.message,
        Code: 400,
        Data: "Not available",
      });
    }
  },
  passwordTokenVerification: function (req, res, next) {
    const token = req.header("passwordToken");
    if (!token)
      return res.status(401).send({
        Message: "No Token Found",
        Code: 401,
        Data: "Not available",
      });
    try {
      const decoded = jwt.verify(token, config.passwordKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send({
        Message: ex.message,
        Code: 400,
        Data: "Not available",
      });
    }
  },
  verifySmsTokenVerification: function (req, res, next) {
    const token = req.header("verifySmsToken");
    if (!token)
      return res.status(401).send({
        Message: "No Token Found",
        Code: 401,
        Data: "Not available",
      });
    try {
      const decoded = jwt.verify(token, config.verifySmsKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send({
        Message: ex.message,
        Code: 400,
        Data: "Not available",
      });
    }
  },
  twoFactorAuthenticationTokenVerification: function (req, res, next) {
    const token = req.header("twoFactor-jwt");
    if (!token)
      return res.status(401).send({
        Message: "No Token Found",
        Code: 401,
        Data: "Not available",
      });
    try {
      const decoded = jwt.verify(token, config.twoFactorAuthenticationKey);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send({
        Message: ex.message,
        Code: 400,
        Data: "Not available",
      });
    }
  },
};
