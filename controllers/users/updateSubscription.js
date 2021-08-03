const { userService } = require("../../service");

const updateSubscription = async (req, res, next) => {
  const userId = req.user.id;
  const { body } = req;

  try {
    const user = await userService.updateById(userId, body);

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
