const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const {
  validateAuth,
  validateSubscription,
  jwtAuthorizeCheck,
} = require("../../middlewares");

router.patch(
  "/",
  jwtAuthorizeCheck,
  validateSubscription,
  ctrl.updateSubscription
);
router.post("/signup", validateAuth, ctrl.register);
router.post("/login", validateAuth, ctrl.login);
router.get("/logout", jwtAuthorizeCheck, ctrl.logout);
router.get("/current", jwtAuthorizeCheck, ctrl.getCurrentUser);

module.exports = router;
