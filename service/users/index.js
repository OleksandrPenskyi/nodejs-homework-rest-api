const { User } = require("../../model");

const getOneUser = (value) => {
  return User.findOne(value);
};

const addUser = ({ email, password, avatarURL, verifyToken }) => {
  const newUser = new User({ email, avatarURL, verifyToken });
  newUser.setPassword(password);
  return newUser.save();
};

const updateById = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
};

const getUserById = (id) => {
  return User.findById(id);
};

module.exports = {
  getOneUser,
  addUser,
  updateById,
  getUserById,
};
