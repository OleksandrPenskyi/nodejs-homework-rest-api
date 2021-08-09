const Joi = require("joi");

const registerLoginSchema = Joi.object({
  email: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

const patchSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const patchAvatarSchema = Joi.object({
  avatarURL: Joi.string().required(),
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

const validateSubscription = (req, res, next) => {
  const { error } = patchSubscriptionSchema.validate(req.body);

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

const validatePatchAvatar = (req, res, next) => {
  const { error } = patchAvatarSchema.validate(req.body.avatarURL);

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
  validateSubscription,
  validatePatchAvatar,
};
