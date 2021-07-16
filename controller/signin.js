// IMPORT FILES
const {
  USER
} = require("../models/user");
// const {
//   twoFactorAuthentication,
//} = require("../templates/loginTwoFactorAuthentication");
const {
  jwtToken
} = require("../templates/tokenGenerator");
const {
  validateLogin
} = require("../templates/validateLogin");

// IMPORT LIBRARIES
const bcrypt = require("bcrypt");

async function login(req, res) {
  const {
    error
  } = validateLogin(req.body); // validate JOI
  if (error) {
    let msg = error.details[0].message.split(" "); // Extract key from error message
    msg[0] = msg[0].slice(1, -1); // remove ""
    return res.status(400).send({
      Message: `Invalid ${msg[0]} provided...`,
      Code: 400,
      data: "Not available",
    });
  }
  let user = await USER.findOne({
    email: req.body.email
  }); // Check database by email
  if (!user)
    return res.status(400).send({
      Message: "Not found...",
      Code: 400,
      Data: "Not available...",
    });
  // if (user.twoFactor == true) {
  //   const response = twoFactorAuthentication(
  //     user,
  //     req.body.password,
  //     user.password,
  //     res
  //   ); // generated temporary token.
  //   return response;
  // }
  const validPassword = await bcrypt.compare(req.body.password, user.password); // verification of password
  if (!validPassword)
    return res.status(400).send({
      Message: "incorrect password",
      Code: 400,
      Data: "Not available",
    });
  const token = jwtToken(user._id); // generate permanent token
  res.send({
    Message: "Success",
    Code: 200,
    Data: {
      token: token
    },
  });
}

module.exports = {
  login
};