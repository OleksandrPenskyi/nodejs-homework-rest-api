/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable quotes */
const fs = require("fs/promises");
const contacts = require("./contacts.json");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const foundContact = await contactsList.find(({ id }) => id === contactId);
    if (!foundContact) {
      throw new Error("Not found");
    }
    return foundContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const deletedContact = await contactsList.find(
      ({ id }) => id === contactId
    );
    if (!deletedContact) {
      throw new Error("Not found");
    }
    const changedContacts = contacts.filter(
      ({ id }) => id !== deletedContact.id
    );
    updateContacts(contactsPath, changedContacts);
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  const newContact = { id: uuidv4(), ...body };

  try {
    const contactsList = await listContacts();
    const newContactList = [...contactsList, newContact];
    updateContacts(contactsPath, newContactList);
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const contactIdx = contactsList.findIndex(({ id }) => id === contactId);
    if (contactIdx === -1) {
      throw new Error("Not found");
    }
    contactsList[contactIdx] = { ...contactsList[contactIdx], ...body };
    updateContacts(contactsPath, contactsList);
    return contactsList[contactIdx];
  } catch (error) {
    throw error;
  }
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
