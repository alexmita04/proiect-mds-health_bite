// definirea si modelarea schemei si a modelului pentru meniuri
const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: [true, "Menu name is required"],
  },
  recipes: [
    {
      recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: [true, "Recipe ID is required"],
      },
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: [true, "Day of the week is required"],
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Creator ID is required"],
  },
});

// mai jos am adaugat propietati virtuale pentru a calcula totalul caloriilor,
// proteinelor, grasimilor si carbohidratilor din retetele incluse in meniu,
// pentru ca n-ar fi avut niciun sens sa stocam in baza de date aceste lucruri,
// ele fiind calculate cu date pe care le avem deja
menuSchema.virtual("totalCalories").get(function () {
  if (!this.recipes || this.recipes.length === 0) return 0;

  return this.recipes.reduce((total, recipeItem) => {
    return total + (recipeItem.recipe.nutritionalInfo?.calories || 0);
  }, 0);
});

menuSchema.virtual("totalProtein").get(function () {
  if (!this.recipes || this.recipes.length === 0) return 0;

  return this.recipes.reduce((total, recipeItem) => {
    return total + (recipeItem.recipe.nutritionalInfo?.protein || 0);
  }, 0);
});

menuSchema.virtual("totalFats").get(function () {
  if (!this.recipes || this.recipes.length === 0) return 0;

  return this.recipes.reduce((total, recipeItem) => {
    return total + (recipeItem.recipe.nutritionalInfo?.fats || 0);
  }, 0);
});

menuSchema.virtual("totalCarbohydrates").get(function () {
  if (!this.recipes || this.recipes.length === 0) return 0;

  return this.recipes.reduce((total, recipeItem) => {
    return total + (recipeItem.recipe.nutritionalInfo?.carbohydrates || 0);
  }, 0);
});

// Setam ca propietatile virtuale sa fie incluse atunci cand
// se fac conversii in json sau in obiecte
menuSchema.set("toJSON", { virtuals: true });
menuSchema.set("toObject", { virtuals: true });

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
