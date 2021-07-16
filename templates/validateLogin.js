// IMPORT LIBRARIES
const Joi = require("joi");

module.exports = {
  validateLogin: function (req) {
    const schema = {
      email: Joi.string().required().email(),
      password: Joi.string().min(8).required(),
    };
    return Joi.validate(req, schema);
  },
};
