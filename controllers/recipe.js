const Recipe = require("../models/recipe");

exports.showRecipes = async (req, res, next) => {
  const queryObj = {};

  if (req.query.mealType) queryObj.mealType = req.query.mealType;
  if (req.query.category) queryObj.category = req.query.category;
  if (req.query.difficulty) queryObj.difficulty = req.query.difficulty;

  try {
    const recipes = await Recipe.find(queryObj);
    res.render("recipes/index", {
      recipes,
      req,
    });
  } catch (err) {
    next(err);
  }
};

exports.showRecipe = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id).populate({
    path: "reviews",
    populate: { path: "author" },
  });
  res.render("recipes/show", { recipe });
};
