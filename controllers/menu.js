const ingredientsList = require("../seeds/ingredients");
const Recipe = require("../models/recipe");
const Menu = require("../models/menu");

function getRandomRecipe(array) {
  if (!array.length) return null;
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

exports.showNewMenu = (req, res) => {
  res.render("menus/new", { ingredients: ingredientsList });
};

exports.createMenu = async (req, res, next) => {
  const {
    mealType,
    fourMeals,
    difficulty,
    maxCookingTime,
    maxCalories,
    dislikedIngredients,
  } = req.body;

  // console.log(mealType);
  // console.log(fourMeals);
  // console.log(difficulty);
  // console.log(maxCookingTime);
  // console.log(maxCalories);
  // console.log(dislikedIngredients);

  const filter = {
    mealType,
    difficulty,
    cookingTime: { $lte: maxCookingTime },
    "nutritionalInfo.calories": { $lte: maxCalories },
    ingredients: {
      $not: {
        $elemMatch: {
          name: { $in: dislikedIngredients || [] },
        },
      },
    },
  };

  const allRecipes = await Recipe.find(filter);

  const grouped = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  };

  allRecipes.forEach((recipe) => {
    if (grouped[recipe.category]) {
      grouped[recipe.category].push(recipe);
    }
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const recipesForMenu = [];

  for (const day of days) {
    const breakfast = getRandomRecipe(grouped.breakfast);
    const lunch = getRandomRecipe(grouped.lunch);
    const dinner = getRandomRecipe(grouped.dinner);

    if (!breakfast || !lunch || !dinner) {
      return res
        .status(400)
        .json({ message: "Not enough recipes to generate a full menu" });
    }

    recipesForMenu.push({ recipe: breakfast._id, day });
    recipesForMenu.push({ recipe: lunch._id, day });
    recipesForMenu.push({ recipe: dinner._id, day });

    // console.log(fourMeals);
    if (fourMeals === "da") {
      const snack = getRandomRecipe(grouped.snack);
      if (!snack) {
        return res.status(400).json({ message: "Not enough snack recipes" });
      }
      recipesForMenu.push({ recipe: snack._id, day });
    }
  }

  const menu = new Menu({
    name: `Meniu Saptamanal - ${new Date().toLocaleDateString()}`,
    recipes: recipesForMenu,
    createdBy: req.user._id,
  });

  await menu.save();

  res.redirect("/menus");
};

exports.showMenu = async (req, res) => {
  const { id } = req.params;
  const menu = await Menu.findById(id).populate("recipes.recipe");
  res.render("menus/show", { menu });
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;
  await Menu.findByIdAndDelete(id);
  res.redirect("/menus");
};

exports.showMenus = async (req, res, next) => {
  const menus = await Menu.find({ createdBy: req.user._id });
  res.render("menus/index", { menus });
};
