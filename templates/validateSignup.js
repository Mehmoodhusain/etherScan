// IMPORT LIBRARIES
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

// DATE DEFINITION
var date18YearsAgo = new Date(
  Date.now() +
    1000 * 60 * 60 * 5 -
    1000 * 60 * 60 * 24 * 5 -
    1000 * 60 * 60 * 24 * 365 * 18
);

module.exports = {
  validate: function (user) {
    const schema = {
      firstName: Joi.string()
        .regex(/^[a-zA-Z\-]+$/)
        .min(3)
        .max(15)
        .required(),
      lastName: Joi.string()
        .regex(/^[a-zA-Z\-]+$/)
        .min(3)
        .max(15)
        .required(),
      email: Joi.string()
        .regex(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)
        .required()
        .email(),
      phone: Joi.string()
        .regex(/^(\+923)[0-4]{1}[0-9]{8}$/) //.regex(/^((\+923)|(^00923)|(^03))[0-4]{1}[0-9]{8}$/)
        .required(),
      password: Joi.string().min(8).required(),
      repeat_password: Joi.ref("password"),
      dob: Joi.date().max(date18YearsAgo).required(),
      country: Joi.string()
        .regex(/pakistan/i)
        .required(),
    };
    return Joi.validate(user, schema);
  },
};
