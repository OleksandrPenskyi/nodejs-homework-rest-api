const { contactService } = require("../../service");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;

  try {
    const editContactStatus = await contactService.updateStatusContact(
      contactId,
      body
    );

    if (!editContactStatus) {
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
        editContactStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatus;
