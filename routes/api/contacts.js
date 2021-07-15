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

// *ничего не получает
// *вызывает функцию listContacts для работы с json-файлом contacts.json
// *возвращает массив всех контактов в json-формате со статусом 200
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

// *Не получает body
// *Получает параметр contactId
// *вызывает функцию getById для работы с json-файлом contacts.json
// *если такой id есть, возвращает обьект контакта в json-формате со статусом 200
// *если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
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

// *Получает body в формате {name, email, phone}
// todo Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
// todo Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
// *Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
// *По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post("/", async (req, res, next) => {
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

// *Не получает body
// *Получает параметр contactId
// *вызывает функцию removeContact для работы с json-файлом contacts.json
// *если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// *если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
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

// *Получает параметр contactId
// *Получает body в json-формате c обновлением любых полей name, email и phone
// *Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
// *Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
// *По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.patch("/:contactId", async (req, res, next) => {
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
