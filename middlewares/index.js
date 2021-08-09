const {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
} = require("./contacts");

const {
  validateAuth,
  validateSubscription,
  validatePatchAvatar,
} = require("./users");
const jwtAuthorizeCheck = require("./auth");
const uploadPictures = require("./uploadPictures");

module.exports = {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
  validateAuth,
  jwtAuthorizeCheck,
  validateSubscription,
  validatePatchAvatar,
  uploadPictures,
};
