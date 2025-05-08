const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const Review = require("../models/review");
const ingredientsList = require("./ingredients");
const { descriptors, foods } = require("./seedHelpers");

// conectam la baza de date MongoDB folosind Mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/health-bite");
  console.log("Connected to MongoDB");
}

// aceasta functie ne va returna un element random dintr-un array,
// pe care il primeste ca parametru
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// acesta functie ne va returna un numar random intre min si max,
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const seedDb = async () => {
  await Recipe.deleteMany({}); // stergem toate retetele existente in baza de date
  await Review.deleteMany({}); // stergem toate recenziile existente in baza de date

  const n = 500; // numarul de retete pe care dorim sa le cream
  for (let i = 1; i <= n; i++) {
    const randomIngredientList = [];
    const counterIngredients = getRandomInt(3, 7); // numarul de ingrediente random intr 3 si 7

    // adaugam in ingredientsList mai multe ingrediente random
    for (let j = 0; j < counterIngredients; j++) {
      const randomIngredient = getRandomElement(ingredientsList);
      if (!randomIngredientList.includes(randomIngredient)) {
        randomIngredientList.push(randomIngredient);
      } else {
        j--;
      }
    }

    const randomTitle = `${getRandomElement(foods)} ${getRandomElement(
      descriptors
    )}`;

    const randomCookingTime = getRandomInt(10, 60); // timpul de gatire random intre 10 si 60 de minute

    const recipe = new Recipe({
      title: randomTitle,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      ingredients: randomIngredientList.map((ingredient) => ({
        name: ingredient,
        quantity: getRandomInt(7, 25), // pentru fiecare ingredient generam o cantitate random
      })),
      instructions: `Amestecam toate ingredientele pentru ${randomCookingTime} minute.`,
      cookingTime: randomCookingTime,
      difficulty: getRandomElement(["easy", "medium", "hard"]),
      nutritionalInfo: {
        calories: getRandomInt(100, 500),
        protein: getRandomInt(10, 50),
        fats: getRandomInt(5, 30),
        carbohydrates: getRandomInt(20, 100),
      },
      mealType: getRandomElement([
        "weight loss",
        "muscle gain",
        "maintenance",
        "low-carb",
      ]),
      category: getRandomElement(["breakfast", "lunch", "dinner", "snack"]),
    });
    await recipe.save();
  }
};

// apelam functia de seed si folosim .then si catch pentru ca seedDb este o functie asincrona
seedDb()
  .then(() => {
    console.log("seed-ul s-a fost realizat cu succes");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("la seed a aparut o eroare:", err);
    mongoose.connection.close();
  });
