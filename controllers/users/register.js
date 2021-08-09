const { userService } = require("../../service");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const getUser = await userService.getOneUser({ email });

    if (getUser) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
    }

    const avatarURL = gravatar.profile_url(email, {
      s: "100",
      format: "jpg",
    });

    const user = await userService.addUser({ email, password, avatarURL });
    res.status(201).json({
      status: "success",
      code: 409,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
