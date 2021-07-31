const {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
} = require("./contacts");

const { validateAuth } = require("./users");

module.exports = {
  validateAddContact,
  validatePatchContact,
  validateStatusContact,
  validateAuth,
};
