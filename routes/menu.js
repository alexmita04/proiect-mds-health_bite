const express = require("express");
const catchAsync = require("../utility/catchAsync");
const menuController = require("../controllers/menu");
const { isLoggedIn } = require("../middleware");

// definim un router pentru a gestiona rutele meniurile
const router = express.Router();

router.route("/").post(isLoggedIn, catchAsync(menuController.createMenu));
router.route("/new").get(isLoggedIn, catchAsync(menuController.showNewMenu));
router
  .route("/:id")
  .get(isLoggedIn, catchAsync(menuController.showMenu))
  .delete(isLoggedIn, catchAsync(menuController.deleteMenu));

router
  .route("/:id/users/:userId")
  .get(isLoggedIn, catchAsync(menuController.showMenus));

module.exports = router;
