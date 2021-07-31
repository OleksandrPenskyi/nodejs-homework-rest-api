const { User } = require("../../model");

const getOneUser = (email) => {
  return User.findOne(email);
};

const addUser = ({ email, password }) => {
  const newUser = new User({ email });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, options) => {
  return User.findByIdAndUpdate(id, options, { new: true });
};

module.exports = {
  getOneUser,
  addUser,
  updateById,
};
