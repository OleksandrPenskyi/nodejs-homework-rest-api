const getCurrentUser = (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: req.user,
  });
};

module.exports = getCurrentUser;
