// IMPORT LIBRARIES
const Joi = require("joi");

module.exports = {
  validateForgetPassword: function (req) {
    const schema = {
      email: Joi.string().required().email(),
    };
    return Joi.validate(req, schema);
  },
};
