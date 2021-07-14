/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */

const fs = require("fs/promises");
const contacts = require("./contacts.json");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = () => contacts;

const getContactById = (contactId) => {
  const data = contacts.find(({ id }) => id === contactId);
  return data;
};

const removeContact = async (contactId) => {
  const deletedContact = contacts.find(({ id }) => id === contactId);
  const changedContacts = contacts.filter(({ id }) => id !== deletedContact.id);
  await fs.writeFile(contactsPath, JSON.stringify(changedContacts, null, 2));
  return deletedContact;
};

const addContact = async (body) => {
  const allContacts = listContacts();
  const newContact = body;
  const newContactList = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
