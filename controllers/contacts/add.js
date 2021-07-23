const { contactService } = require("../../service");

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };

  try {
    const newContact = await contactService.add(body);

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
