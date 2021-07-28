const { User } = require("../../model");

const getOneUser = (email) => {
  return User.findOne(email);
};

const addUser = ({ email, password }) => {
  return User.create({ email, password });
};

module.exports = {
  getOneUser,
  addUser,
};
