const { contactService } = require("../../service");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const userId = req.user.id;

  try {
    const editeContact = await contactService.update(userId, contactId, body);

    if (!editeContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 400,
      data: {
        editeContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = update;
