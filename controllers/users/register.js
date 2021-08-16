const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { userService } = require("../../service");
const sendMail = require("../../utils");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const verifyToken = nanoid();
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

    const user = await userService.addUser({
      email,
      password,
      avatarURL,
      verifyToken,
    });

    const verifyData = {
      to: user.email,
      subject: "Подтвеждение адреса email",
      text: "Open the link below to confirm yor email",
      html: `<a target="_blank" href="http://localhost:3000/users/verify/${verifyToken}">Open the <b>Link</b> to verify email address</a>`,
    };

    await sendMail(verifyData);

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
