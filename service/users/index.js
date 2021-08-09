const { User } = require("../../model");

const getOneUser = (email) => {
  return User.findOne(email);
};

const addUser = ({ email, password, avatarURL }) => {
  const newUser = new User({ email, avatarURL });
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
