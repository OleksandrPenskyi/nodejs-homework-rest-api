const { contactService } = require("../../service");

const getAll = async (req, res, next) => {
  const userId = req.user.id;
  const searchQuery = req.query;

  try {
    const contacts = await contactService.getAll(userId, searchQuery);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
