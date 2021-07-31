const getCurrentUser = (req, res, next) => {
  const { email, subscription } = req.user;
  const user = {
    email,
    subscription,
  };

  res.json({
    status: "success",
    code: 200,
    data: user,
  });
};

module.exports = getCurrentUser;
