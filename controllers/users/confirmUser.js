const { userService } = require("../../service");

const confirmUser = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await userService.getOneUser({ verifyToken: verificationToken });

  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }

  await userService.updateById(user._id, {
    verifyToken: null,
    verify: true,
  });

  res.json({
    status: "success",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = confirmUser;
