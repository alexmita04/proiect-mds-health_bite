exports.showLogin = (req, res) => {
  res.render("users/login");
};

exports.login = async (req, res) => {
  console.log(req.body.users);
  res.send("login");
};

exports.showRegister = (req, res) => {
  res.render("users/register");
};

exports.register = async (req, res) => {
  console.log(req.body.users);
  res.send("register");
};

exports.logout = async (req, res) => {
  res.send("logout");
};
