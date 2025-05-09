const Recipe = require("../models/recipe");

exports.showRecipes = async (req, res, next) => {
  const recipes = await Recipe.find().limit(20);
  res.render("recipes/index", { recipes });
};

exports.showRecipe = (req, res) => {
  res.send("show recipe");
};
