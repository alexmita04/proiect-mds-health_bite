const Recipe = require("../models/recipe");

exports.showRecipes = async (req, res, next) => {
  const recipes = await Recipe.find().limit(20);
  res.render("recipes/index", { recipes });
};

exports.showRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  res.render("recipes/show", { recipe });
};
