const express = require("express");
const catchAsync = require("../utility/catchAsync");
const userController = require("../controllers/user");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

// definim un router pentru a gestiona rutele utilizatorului
const router = express.Router();

router
  .route("/login")
  .get(catchAsync(userController.showLogin))
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/users/login",
    }),
    catchAsync(userController.login)
  );

router
  .route("/register")
  .get(catchAsync(userController.showRegister))
  .post(catchAsync(userController.register));

router.route("/logout").post(catchAsync(userController.logout));

module.exports = router;
