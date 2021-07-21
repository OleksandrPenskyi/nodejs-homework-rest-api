const { contactService } = require("../../service");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    if (!Object.keys(body).length > 0) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const editeContact = await contactService.update(contactId, body);

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
