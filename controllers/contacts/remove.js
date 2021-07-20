const { contactService } = require("../../service");

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    await contactService.remove(contactId);

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
