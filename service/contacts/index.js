/* eslint-disable no-useless-catch */
const { Contact } = require("../../model");

const getAll = () => {
  return Contact.find();
};

const getById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const add = (body) => {
  return Contact.create(body);
};

const remove = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const update = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
};
