// IMPORT FILES
const { validate } = require("../templates/validateSignup");
const { USER } = require("../models/user");

// IMPORT LIBRARIES
const passCom = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const _ = require("lodash");

//  PASSWORD CINDITIONS
const complexityOptions = {
  min: 8,
  max: 26,
  upperCase: 1,
  numeric: 1,
};

async function signup(req, res) {
  const { error } = validate(req.body); // validation JOI
  if (error) {
    let msg = error.details[0].message.split(" "); // extract property word from error message
    msg[0] = msg[0].slice(1, -1); // remove ""
    if (msg[0] == "dob") {
      return res.status(400).send({
        Message: `USER must be atleast 18 years old...`,
        Code: 400,
        data: "Not available",
      });
    } else {
      return res.status(400).send({
        Message: `Invalid ${msg[0]} provided...`,
        Code: 400,
        data: "Not available",
      });
    }
  }
  
  let user = await USER.findOne({ email: req.body.email }); // find by email
  if (user)
    return res.status(400).send({
      Message: "This email is already registered...",
      Code: 400,
      data: "Not available",
    });
  const pass = await passCom(complexityOptions).validate(req.body.password); // password validation
  if (pass.error)
    return res.status(400).send({
      Message: "Invalid password...",
      Code: 400,
      data: "Not available",
    });
    //const ether = await ETHER.find().select("value");
  //if (!ether) return res.status(400).send("Invalid etherValue.");
  user = new USER({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      password: req.body.password,
      country: req.body.country,
      balanceEther: 0,
      balanceDollar: 0,

    });
    
  //  user = await user.save();
  
  // user = new USER(
  //   _.pick(req.body, [
  //     "firstName",
  //     "lastName",
  //     "email",
  //     "phone",
  //     "dob",
  //     "password",
  //     ])
  // );

  // user.twoFactor = false; // by default is false
  // user.authToken = ""; // by default is empty string
  user.dob = user.dob.setDate(user.dob.getDate() + 1); // date differs 1 day due to time zone. Incremented

  const salt = await bcrypt.genSalt(10); // puts 10 layers of encryption on password
  user.password = await bcrypt.hash(user.password, salt); // hash password

  try {
    //const token = user.generateAuthToken();
    user = await user.save();
    res.status(200).send({
      Message: "Success",
      Code: 200,
      Data: _.pick(user, ["firstName", "lastName", "email"]),
    });
  } catch (ex) {
    res.status(400).send({
      Message: ex.message,
      Code: 400,
      Data: "Not available",
    });
  }
}

module.exports = {
  signup,
};
