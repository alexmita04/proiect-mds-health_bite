exports.showLogin = (req, res) => {
  res.send("show login");
};

exports.login = async (req, res) => {
  res.send("login");
};

exports.showRegister = (req, res) => {
  res.send("show register");
};

exports.register = async (req, res) => {
  res.send("register");
};

exports.logout = async (req, res) => {
  res.send("logout");
};
