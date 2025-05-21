const Review = require("./models/review");

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

exports.isAuthorReview = async (req, res, next) => {
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Nu ai permisiuni sa faci acest lucru!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};
