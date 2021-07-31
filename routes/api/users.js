const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { validateAuth } = require("../../middlewares");

router.post("/signup", validateAuth, ctrl.register);
router.get("/login", validateAuth, ctrl.login);

// router.get("/:contactId", ctrl.getById);

// router.post("/", validateAddContact, ctrl.add);

// router.delete("/:contactId", ctrl.remove);

// router.patch("/:contactId", validatePatchContact, ctrl.update);

// router.patch("/:contactId/favorite", validateStatusContact, ctrl.updateStatus);

module.exports = router;
