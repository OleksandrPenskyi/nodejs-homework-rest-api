const { contactService } = require("../../service");

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactService.getById(contactId);

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
