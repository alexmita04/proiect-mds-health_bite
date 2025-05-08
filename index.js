// folosim pachetul dotnev numai daca nu suntem in productie
// pentru a incarca variabilele de mediu din fisierul .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
  console.log(process.env.PORT);
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const menuRouter = require("./routes/menu");
const reviewRouter = require("./routes/review");

// conectam la baza de date MongoDB folosind Mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/health-bite");
  console.log("Connected to MongoDB");
}

// crearea unei aplicatii Express
const app = express();

// MIDDLEWARES

//folosim method-override pentru a putea folosi metode
// diferite fata de GET si POST in forms in html
app.use(methodOverride("_method"));

// folosim acest middleware pentru a face parsing
// la datele trimise in request body de catre formulare
app.use(express.urlencoded({ extended: true }));

// route-ul pentru homepage
app.get("/", (req, res) => {
  res.send("homepage");
});

// configurare routere
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/menus", menuRouter);
app.use("/recipes/:id/reviews", reviewRouter);

const PORT = process.env.PORT || 3000; // definirea portului dinamic, avand un default de 3000
app.listen(PORT, () => {});
