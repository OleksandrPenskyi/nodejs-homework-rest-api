const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const {
  validateAuth,
  validateSubscription,
  jwtAuthorizeCheck,
  validatePatchAvatar,
  uploadPictures,
  getRepeatVerify,
} = require("../../middlewares");

router.patch(
  "/",
  jwtAuthorizeCheck,
  validateSubscription,
  ctrl.updateSubscription
);
router.post("/signup", validateAuth, ctrl.register);
router.post("/login", validateAuth, ctrl.login);
router.post("/verify", getRepeatVerify, ctrl.repeatVerify);

router.get("/logout", jwtAuthorizeCheck, ctrl.logout);
router.get("/current", jwtAuthorizeCheck, ctrl.getCurrentUser);
router.get("/verify/:verificationToken", ctrl.confirmUser);
router.patch(
  "/avatars",
  uploadPictures.single("avatar"),
  jwtAuthorizeCheck,
  validatePatchAvatar,
  ctrl.updateAvatar
);
module.exports = router;
