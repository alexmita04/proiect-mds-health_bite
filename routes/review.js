const express = require("express");
const catchAsync = require("../utility/catchAsync");
const reviewController = require("../controllers/review");
const { isAuthorReview } = require("../middleware");

// definim un router pentru a gestiona rutele review-urilor
// trebuie sa adaugam mergeParams pentru a avea access la parametrul
// id care este id-u retetei asociate review-ului
const router = express.Router({ mergeParams: true });

router.route("/").post(catchAsync(reviewController.createReview));
router
  .route("/:reviewId")
  .delete(isAuthorReview, catchAsync(reviewController.deleteReview));

module.exports = router;
