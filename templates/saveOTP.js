// IMPORT FILES
const { OTP } = require("../models/otpSchema");
const { User } = require("../models/signup");

module.exports = {
  saveEmailOTP: async function (user, id, code) {
    const userOtp = await new OTP({
      userid: id,
      emailotp: code,
    });
    await userOtp.save();
    user.emailOtpId = userOtp._id;
    await user.save();
  },
  saveSmsOTP: async function (user, id, code) {
    const userOtp = await new OTP({
      userid: id,
      smsotp: code,
    });
    await userOtp.save();
    user.smsOtpId = userOtp._id;
    await user.save();
  },
};
