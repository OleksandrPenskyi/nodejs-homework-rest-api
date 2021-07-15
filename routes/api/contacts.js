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
const { v4: uuidv4 } = require("uuid");

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
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
    }

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

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContactBody = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  try {
    const newContact = await addContact(newContactBody);
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
  const id = checkIdType(req);

  try {
    const deletedContact = await removeContact(id);

    // todo
    // if (!deletedContact) {
    //   res.status(404).json({
    //     status: "error",
    //     code: 404,
    //     message: `Contact with id=${id} not found`,
    //   });
    // }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        deletedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

// todo
router.patch("/:contactId", async (req, res, next) => {
  const id = checkIdType(req);
  const body = req.body;

  try {
    const editedContact = await updateContact(id, body);
    if (!editedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${id} not found`,
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
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
