const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
} = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateAddContact, ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.patch("/:contactId", validatePatchContact, ctrl.update);

router.patch("/:contactId/favorite", validateStatusContact, ctrl.updateStatus);

module.exports = router;
