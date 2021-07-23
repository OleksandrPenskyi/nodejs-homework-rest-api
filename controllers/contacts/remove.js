const { contactService } = require("../../service");

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deleteContact = await contactService.remove(contactId);

    if (!deleteContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
