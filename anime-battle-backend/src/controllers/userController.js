export const getDashboard = (req, res) => {
  res.json({
    message: `Welcome to your dashboard, ${req.user.username}!`,
    user: req.user,
  });
};
