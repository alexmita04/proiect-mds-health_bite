const express = require("express");
const catchAsync = require("../utility/catchAsync");
const userController = require("../controllers/user");

// definim un router pentru a gestiona rutele utilizatorului
const router = express.Router();

router
  .route("/login")
  .get(catchAsync(userController.showLogin))
  .post(catchAsync(userController.login));

router
  .route("/register")
  .get(catchAsync(userController.showRegister))
  .post(catchAsync(userController.register));

router.route("/logout").post(catchAsync(userController.logout));

module.exports = router;
