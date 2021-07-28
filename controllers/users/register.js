const { userService } = require("../../service");

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

    const user = await userService.addUser({ email, password });
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
