// IMPORT LIBRARIES
const Joi = require("joi");

module.exports = {
  validateNewPassword: function (user) {
    const schema = {
      password: Joi.string().min(8).required(),
      repeat_password: Joi.ref("password"),
    };
    return Joi.validate(user, schema);
  },
};
