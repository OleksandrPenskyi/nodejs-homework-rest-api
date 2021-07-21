const { contactService } = require("../../service");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    if (!Object.keys(body).length > 0) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
    }

    const editContactStatus = await contactService.updateStatusContact(
      contactId,
      body
    );

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        editContactStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
