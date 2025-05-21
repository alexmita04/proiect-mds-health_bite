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
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const userRouter = require("./routes/user");
const recipeRouter = require("./routes/recipe");
const menuRouter = require("./routes/menu");
const reviewRouter = require("./routes/review");
const ExpressError = require("./utility/ExpressError");
const User = require("./models/user");

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

const sessionConfig = {
  secret: process.env.SESSIONSECRET,
  resave: false, // nu mai salvam sesiunea daca nu s-a schimbt nimic
  saveUninitialized: true, // se salveaza sesiunea chiar daca nu are nicio data
  cookie: {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, // foarte important de setata ca cookie-ul sa nu poata fi accesat din client side
  },
};

// middleware-ul care se ocupa de stoacarea sesiunii intr-un cookie
app.use(session(sessionConfig));

// middleware-ul care ne ajuta sa avem functionalitatea de flash
app.use(flash());

app.use(passport.initialize());

// acest middleware face conexiunea intre express-session si passport
app.use(passport.session());

// setarea unei strategii locale
passport.use(new LocalStrategy(User.authenticate()));

// serializarea unui user stabileste ce detalii despre acesta
// vor fi stocate in session, in cazul nostru doar id-ul
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // daca exista un mesaj in flash, va fi atribuit raspunsului pentru
  // a putea fi randat in view
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.returnTo);

  // sa aveam acces si in views la obiectul user pus la dispozitie de passport
  res.locals.currentUser = req.user;
  // console.log(req.user);
  next();
});

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
  // console.log(err);
  res.send(err.message);
});

const PORT = process.env.PORT || 3000; // definirea portului dinamic, avand un default de 3000
app.listen(PORT, () => {});
