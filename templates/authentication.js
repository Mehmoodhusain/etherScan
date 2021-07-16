// IMPORT FILES
const { User } = require("../models/signup");
const {
  jwtToken,
  twoFactorAuthenticationToken,
} = require("./tokenGenerator");

// IMPORT LIBRARIES
const speakeasy = require("speakeasy");

module.exports = {
  enable2fa: async function (req, res) {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res.status(404).send({
        Message: "Record not found in database...",
        Code: 404,
        Data: "Not available",
      });

    if (user.twoFactor == false) {
      user.twoFactor = true;
      const { base32: secret } = speakeasy.generateSecret(); // generate secret code for authenticator and qr code
      user.authToken = secret;
      const token = twoFactorAuthenticationToken(user._id); // generate temporary token which is only applicable to verify route
      await user.save();
      res.send({
        Message: "Success",
        Code: 200,
        Data: { user: user, twoFactorAuthenticationToken: token },
      });
    } else
      res
        .status(400)
        .send("Bad request... Two Factor Authentication already enabled");
  },
  disable2fa: async function (req, res) {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res.status(404).send({
        Message: "Record not found in database...",
        Code: 404,
        Data: "Not available",
      });
    if (user.twoFactor == false) {
      res.send({
        Message:
          "Bad Request... Two Factor Authentication is already disabled.",
        Code: 400,
        Data: user,
      });
    }
    user.twoFactor = false;
    user.authToken = "";
    await user.save();
    res.send({
      Message: "Success",
      Code: 200,
      Data: user,
    });
  },
  verify2fa: async function (req, res) {
    let code = req.body.code; // 6 digit code
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res.status(404).send({
        Message: "Record not found in database...",
        Code: 404,
        Data: "Not available",
      });
    let secret = user.authToken;
    let verified = speakeasy.totp.verify({
      // verify 6 digit code
      secret: secret,
      encoding: "base32",
      token: code,
    });
    if (verified == true) {
      const token = jwtToken(user._id); // generate permanent token
      return res.status(200).send({
        Message: "Authenticated successfully",
        code: 200,
        token: token,
      });
    } else
      return res
        .status(404)
        .send({ Message: "Authentication Failed", code: 404 });
  },
};
