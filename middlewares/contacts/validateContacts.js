const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(5).required(),
  phone: Joi.string().min(3).required(),
  favorite: Joi.boolean().optional(),
});

const patchContactSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().min(5).optional(),
  phone: Joi.string().min(3).optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateAddContact = (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);

  console.log(error);

  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `field ${error.message.replace(/"/g, "")}`,
    });
    return;
  }

  next();
};

const validatePatchContact = (req, res, next) => {
  const { error } = patchContactSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `${error.message.replace(/"/g, "")}`,
    });
    return;
  }

  next();
};

const validateStatusContact = (req, res, next) => {
  const { error } = updateStatusContactSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing field favorite",
    });
    return;
  }

  next();
};

module.exports = {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
};
