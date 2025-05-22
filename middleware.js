const Review = require("./models/review");
const Menu = require("./models/menu");
const { reviewSchema } = require("./schemas");
const ExpressError = require("./utility/ExpressError");

exports.isLoggedIn = (req, res, next) => {
  // console.log("req user: ", req.user);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Trebuie sa fi logat!");
    return res.redirect("/users/login");
  }
  next();
};

exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const menu = await Menu.findById(id);
  if (!menu.createdBy.equals(req.user._id)) {
    req.flash("error", "Nu ai permisiuni sa faci acest lucru!");
    return res.redirect(`/menu/${id}`);
  }
  next();
};

exports.isAuthorReview = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Nu ai permisiuni sa faci acest lucru!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

exports.validateReview = function (req, res, next) {
  const result = reviewSchema.validate(req.body);
  console.log(req.body);
  console.log(result);
  if (result.error) {
    const msg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};
