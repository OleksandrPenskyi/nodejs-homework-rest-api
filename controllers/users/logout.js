const { userService } = require("../../service");

const logout = async (req, res, next) => {
  const { _id: id } = req.user;
  try {
    await userService.updateById(id, { token: null });
    res.status(204).json({
      status: "success",
      code: 204,
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
