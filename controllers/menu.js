const ingredientsList = require("../seeds/ingredients");

exports.showNewMenu = (req, res) => {
  res.render("menus/new", { ingredients });
};

exports.createMenu = async (req, res, next) => {
  res.send("create menu");
};

exports.showMenu = (req, res) => {
  res.send("show menu");
};

exports.deleteMenu = (req, res) => {
  res.send("delete menu");
};

exports.showMenus = (req, res) => {
  res.render("menus/index");
};
