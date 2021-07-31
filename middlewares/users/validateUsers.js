const Joi = require("joi");

const registerLoginSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

const validateAuth = (req, res, next) => {
  const { error } = registerLoginSchema.validate(req.body);

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

module.exports = {
  validateAuth,
};