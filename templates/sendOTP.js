// IMPORT FILES
const config = require("../config/index")

// IMPORT LIBRARIES
const { Auth } = require("two-step-auth");
const nodemailer = require("nodemailer");

const client = require("twilio")(config.accountSid, config.accountAuthToken);

module.exports = {
  sendEmailOTP: async function (emailId) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mehmoodce@gmail.com",
        pass: config.emailPassword,
      },
    });
    const code = Math.floor(100000 + Math.random() * 900000);
    var mailOptions = {
      from: "mehmoodce@gmail.com",
      to: emailId,
      subject: "Email Verification OTP",
      text: "Use this code to authenticate your email request. " + code,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent");
      }
    });
    return code;
  },
  sendSmsOTP: function (phone) {
    const code = Math.floor(100000 + Math.random() * 900000);
    client.messages
      .create({ from: "+18632679170", body: code, to: phone })
      .then((message) => console.log(message.sid));
    return code;
  },
};
