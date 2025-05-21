const Recipe = require("../models/recipe");
const Review = require("../models/review");

exports.createReview = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  const { review: reviewData } = req.body;
  const review = new Review(reviewData);
  review.author = req.user._id;
  await review.save();
  recipe.reviews.push(review);
  await recipe.save();
  req.flash("success", "Ai creat un review");
  res.redirect(`/recipes/${id}`);
};

exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  console.log(id, reviewId);
  const recipe = await Recipe.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review-ul s-a sters cu succes!");
  res.redirect(`/recipes/${id}`);
};
