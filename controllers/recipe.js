const Recipe = require("../models/recipe");

exports.showRecipes = async (req, res, next) => {
  // const recipes = await Recipe.find().limit(20);
  const recipes = await Recipe.find();
  res.render("recipes/index", { recipes });
};

exports.showRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });
  res.render("recipes/show", { recipe });
};
