const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
  jwtAuthorizeCheck,
} = require("../../middlewares");

// router.get(":?", jwtAuthorizeCheck, ctrl.searchFavorite);

router.get("/", jwtAuthorizeCheck, ctrl.getAll);
router.get("/:contactId", jwtAuthorizeCheck, ctrl.getById);
router.post("/", jwtAuthorizeCheck, validateAddContact, ctrl.add);
router.delete("/:contactId", jwtAuthorizeCheck, ctrl.remove);
router.patch(
  "/:contactId",
  jwtAuthorizeCheck,
  validatePatchContact,
  ctrl.update
);
router.patch(
  "/:contactId/favorite",
  jwtAuthorizeCheck,
  validateStatusContact,
  ctrl.updateStatus
);

// Сделать фильтрацию контактов по полю избранного(GET / contacts ? favorite = true)

module.exports = router;
