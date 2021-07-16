// IMPORT FILES
const { OTP } = require("../models/otpSchema");

module.exports = {
  verifyEmailOTP: async function (user, emailOTP, res) {
    const otp = await OTP.findById(user.emailOtpId);
    if (!otp) return false;
    if (otp.emailotp == emailOTP) {
      return true;
    } else {
      return false;
    }
  },
  verifySmsOTP: async function (user, smsOTP, res) {
    const otp = await OTP.findById(user.smsOtpId);
    if (!otp) return false;
    if (otp.smsotp == smsOTP) {
      return true;
    } else {
      return false;
    }
  },
};
