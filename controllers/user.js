const User = require("../models/user");

exports.showLogin = (req, res) => {
  res.render("users/login");
};

exports.login = async (req, res) => {
  req.flash("success", "Bine ai revenit!");
  const redirectUrl = req.session.returnTo || "/recipes";
  // delete req.session.returnTo;
  res.redirect(redirectUrl);
};

exports.showRegister = (req, res) => {
  res.render("users/register");
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.users;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    await req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Bine ai venit pe HealthBite!");
      res.redirect("/recipes");
    });
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    return res.redirect("/users/register");
  }
};

exports.logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  req.flash("success", "Te-ai deloghat cu succes!");
  res.redirect("/recipes");
};
