const express = require("express");
const catchAsync = require("../utility/catchAsync");
const menuController = require("../controllers/menu");
const { isLoggedIn, isAuthor } = require("../middleware");

// definim un router pentru a gestiona rutele meniurile
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, catchAsync(menuController.showMenus))
  .post(isLoggedIn, catchAsync(menuController.createMenu));
router.route("/new").get(isLoggedIn, catchAsync(menuController.showNewMenu));
router
  .route("/:id")
  .get(isLoggedIn, isAuthor, catchAsync(menuController.showMenu))
  .delete(isLoggedIn, isAuthor, catchAsync(menuController.deleteMenu));

module.exports = router;
