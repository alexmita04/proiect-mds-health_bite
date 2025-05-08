// definirea si modelarea schemei si a modelului pentru retete
const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  ingredients: [
    {
      name: {
        type: String,
        required: [true, "Ingredient name is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Ingredient quantity is required"],
      },
    },
  ],
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  cookingTime: {
    type: Number,
    required: [true, "Cooking time is required"],
    min: [1, "Cooking time must be at least 1 minute"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty level is required"],
  },
  nutritionalInfo: {
    calories: {
      type: Number,
      required: [true, "Calories are required"],
    },
    protein: {
      type: Number,
      required: [true, "Protein content is required"],
    },
    fats: {
      type: Number,
      required: [true, "Fat content is required"],
    },
    carbohydrates: {
      type: Number,
      required: [true, "Carbohydrates content is required"],
    },
  },
  mealType: {
    type: String,
    enum: ["weight loss", "muscle gain", "maintenance", "low-carb"],
    required: [true, "Meal type is required"],
  },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner", "snack"],
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
