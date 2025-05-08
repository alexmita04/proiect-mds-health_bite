// folosim pachetul dotnev numai daca nu suntem in productie
// pentru a incarca variabilele de mediu din fisierul .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
  console.log(process.env.PORT);
}

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const menuRouter = require("./routes/menu");
const reviewRouter = require("./routes/review");
const ExpressError = require("./utility/ExpressError");

// conectam la baza de date MongoDB folosind Mongoose
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/health-bite");
  console.log("Connected to MongoDB");
}

// crearea unei aplicatii Express
const app = express();

// MIDDLEWARES
app.engine("ejs", ejsMate); // adauga functionalitati de template pentru EJS
app.set("view engine", "ejs"); // setam EJS ca motor de template
app.set("views", path.join(__dirname, "views")); // setam calea pentru fisierul de views

app.use(express.static(path.join(__dirname, "public"))); // calarea fisierelor statice

//folosim method-override pentru a putea folosi metode
// diferite fata de GET si POST in forms in html
app.use(methodOverride("_method"));

// folosim acest middleware pentru a face parsing
// la datele trimise in request body de catre formulare
app.use(express.urlencoded({ extended: true }));

// route-ul pentru homepage
app.get("/", (req, res) => {
  res.render("homepage");
});

// configurare routere
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/menus", menuRouter);
app.use("/recipes/:id/reviews", reviewRouter);

// ultimul route pentru a prinde toate ceririle gresite intr un 404
// folosim un regex pentru a prinde orice cerere
app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("pagina nu a fost gasita", 404));
});

// middleware pentru a prinde erorile
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err; // statusCode va avea un default de 500
  if (!err.message) err.messge = "Something went wrong"; // setam mesajul de eroare default
  // res.status(statusCode).render("error", { err });
  res.send(err.message);
});

const PORT = process.env.PORT || 3000; // definirea portului dinamic, avand un default de 3000
app.listen(PORT, () => {});
