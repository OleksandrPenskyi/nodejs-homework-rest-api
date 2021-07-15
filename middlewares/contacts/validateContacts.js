/* eslint-disable quotes */
/* eslint-disable semi */
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(5).required(),
  phone: Joi.string().min(3).required(),
});

const patchContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().min(5),
  phone: Joi.string().min(3),
});

const validateAddContact = (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: "missing required name field",
    });
    return;
  }
  next();
};

const validatePatchContact = (req, res, next) => {
  const { error } = patchContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: "missing required name field",
    });
    return;
  }
  next();
};

module.exports = {
  validateAddContact,
  validatePatchContact,
};
