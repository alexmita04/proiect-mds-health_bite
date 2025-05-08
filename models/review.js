// definirea si modelarea schemei si a modelului pentru recenzii
const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: [true, "Recipe ID is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must be at most 5"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
