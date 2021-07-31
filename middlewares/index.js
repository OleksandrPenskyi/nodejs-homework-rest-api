const {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
} = require("./contacts");

const { validateAuth } = require("./users");
const jwtAuthorizeCheck = require("./auth");

module.exports = {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
  validateAuth,
  jwtAuthorizeCheck,
};
