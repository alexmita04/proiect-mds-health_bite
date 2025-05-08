const express = require("express");
const catchAsync = require("../utility/catchAsync");
const recipeController = require("../controllers/recipe");

// definim un router pentru a gestiona rutele retetelor
const router = express.Router();

router.route("/").get(catchAsync(recipeController.showRecipes));
router.route("/:id").get(catchAsync(recipeController.showRecipe));

module.exports = router;
