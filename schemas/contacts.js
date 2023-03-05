const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().min(7).trim().required(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3).trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string().min(7).trim(),
});

module.exports = {
  addSchema,
  putSchema,
};
