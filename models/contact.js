const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const phoneRegexp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().min(7).trim().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string().min(3).trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string().min(7).trim().pattern(phoneRegexp),
  favorite: Joi.boolean(),
});

const patchSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schemasJoi = {
  addSchema,
  putSchema,
  patchSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemasJoi };
