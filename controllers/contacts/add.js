const { contactService } = require("../../service");

const add = async (req, res, next) => {
  const userId = req.user.id;
  const body = req.body;

  try {
    const newContact = await contactService.add(userId, body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = add;
