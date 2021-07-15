/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

const {
  validateAddContact,
  validatePatchContact,
} = require("../../middlewares/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = checkIdType(req);

  try {
    const contact = await getContactById(id);

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
});

router.post("/", validateAddContact, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };

  try {
    const newContact = await addContact(body);
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
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = checkIdType(req);

  try {
    await removeContact(contactId);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", validatePatchContact, async (req, res, next) => {
  const contactId = checkIdType(req);
  const body = req.body;

  try {
    if (!Object.keys(body).length > 0) {
      res.status(400).json({
        status: 400,
        message: "missing fields",
      });
    }

    const editedContact = await updateContact(contactId, body);

    res.status(200).json({
      status: 200,
      data: {
        editedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

function checkIdType(req) {
  let id = req.params.contactId;
  const convrtedId = Number(id);
  // если после преобразования в число получается NaN, то оставляем начальное значение, не преобразуем.
  // если число преобразуется без NaN, то преобразуем
  if (!Number.isNaN(convrtedId)) {
    id = Number(req.params.contactId);
  }
  return id;
}

module.exports = router;
