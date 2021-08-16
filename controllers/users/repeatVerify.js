const { userService } = require("../../service");
const sendMail = require("../../utils");

const repeatVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await userService.getOneUser({ email });

  if (!email) {
    return res.status(400).json({
      status: "success",
      code: 400,
      message: "missing required field email",
    });
  }

  if (user.verify) {
    return res.status(400).json({
      status: "success",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const verifyData = {
    to: user.email,
    subject: "Подтвеждение адреса email",
    text: "Open the link below to confirm yor email",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verifyToken}">Open the <b>Link</b> to verify email address</a>`,
  };

  await sendMail(verifyData);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = repeatVerify;
