const express = require("express");
const catchAsync = require("../utility/catchAsync");
const menuController = require("../controllers/menu");

// definim un router pentru a gestiona rutele meniurile
const router = express.Router();

router.route("/").post(catchAsync(menuController.createMenu));
router.route("/new").get(catchAsync(menuController.showNewMenu));
router
  .route("/:id")
  .get(catchAsync(menuController.showMenu))
  .delete(catchAsync(menuController.deleteMenu));

router.route("/:id/users/:userId").get(catchAsync(menuController.showMenus));

module.exports = router;
