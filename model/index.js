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
  // *check
  if (!deletedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  const changedContacts = contacts.filter(({ id }) => id !== deletedContact.id);
  updateContacts(contactsPath, changedContacts);
  return deletedContact;
};

const addContact = async (body) => {
  const allContacts = listContacts();
  const newContact = body;
  const newContactList = [...allContacts, newContact];
  updateContacts(contactsPath, newContactList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  contacts[contactIdx] = { ...contacts[contactIdx], ...body };
  updateContacts(contactsPath, contacts);
  return contacts[contactIdx];
};

async function updateContacts(path, body) {
  await fs.writeFile(path, JSON.stringify(body, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
