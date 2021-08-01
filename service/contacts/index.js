const { Contact } = require("../../model");

const getAll = (userId, query) => {
  const searchQuery = { owner: userId, ...query };
  return Contact.find(searchQuery).populate("owner");
};

const getById = async (userId, contactId) => {
  const searchQuery = { owner: userId, _id: contactId };
  return Contact.findOne(searchQuery).populate("owner");
};

const add = (userId, body) => {
  const createContact = { ...body, owner: userId };
  return Contact.create(createContact);
};

const remove = async (userId, contactId) => {
  const searchQuery = { owner: userId, _id: contactId };
  return Contact.findOneAndRemove(searchQuery);
};

const update = (userId, contactId, body) => {
  const searchQuery = { owner: userId, _id: contactId };
  return Contact.findOneAndUpdate(searchQuery, body, { new: true });
};

const updateStatusContact = (userId, contactId, body) => {
  const searchQuery = { owner: userId, _id: contactId };
  return Contact.findByIdAndUpdate(searchQuery, body, {
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
