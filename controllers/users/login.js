const jwt = require("jsonwebtoken");
const { userService } = require("../../service");
require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getOneUser({ email });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    if (!user.verify) {
      return res.status(403).json({
        status: "error",
        code: 403,
        message: `The user: ${user.email} is not verified!`,
      });
    }

    const { SECRET_KEY } = process.env;
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await userService.updateById(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
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

module.exports = login;
