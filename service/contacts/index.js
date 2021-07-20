const { Contact } = require("../../model");

const getAll = () => {
  return Contact.find();
};

const getById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

module.exports = {
  getAll,
  getById,
};
