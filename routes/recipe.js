const express = require("express");
const catchAsync = require("../utility/catchAsync");
const recipeController = require("../controllers/recipe");
const { isLoggedIn } = require("../middleware");

// definim un router pentru a gestiona rutele retetelor
const router = express.Router();

router.route("/").get(catchAsync(recipeController.showRecipes));
router.route("/:id").get(isLoggedIn, catchAsync(recipeController.showRecipe));

module.exports = router;
