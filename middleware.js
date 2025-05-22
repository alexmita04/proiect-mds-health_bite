const Review = require("./models/review");
const Menu = require("./models/menu");
const { reviewSchema } = require("./schemas");
const ExpressError = require("./utility/ExpressError");

exports.isLoggedIn = (req, res, next) => {
  // console.log("req user: ", req.user);

  // folosim functia pusa la dispozitie de passport
  if (!req.isAuthenticated()) {
    // salvam ultima destinatie a utilizatorului, ca dupa ce
    // se logheaza sa-l redirectionam in acelasi loc
    req.session.returnTo = req.originalUrl;
    req.flash("error", "Trebuie sa fi logat!");
    // in cazul in care user-ul nu este logat in redirectionam spre
    // pagina de login
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

exports.isAuthor = async (req, res, next) => {
  // verificam in acest middleware, daca persoana care incearca
  // sa faca un request de delete este owner-ul meniului
  const { id } = req.params;
  const menu = await Menu.findById(id);
  if (!menu.createdBy.equals(req.user._id)) {
    req.flash("error", "Nu ai permisiuni sa faci acest lucru!");
    return res.redirect(`/menu/${id}`);
  }
  next();
};

exports.isAuthorReview = async (req, res, next) => {
  // verificam in acest middleware, daca persoana care incearca
  // sa faca un request de delete este owner-ul review-ului
  const { reviewId, id } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "Nu ai permisiuni sa faci acest lucru!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

exports.validateReview = function (req, res, next) {
  // verificam in acest middleware, cu ajutoul schemei JOI,
  // daca review-ul este validat corect
  const result = reviewSchema.validate(req.body);
  // console.log(req.body);
  // console.log(result);
  if (result.error) {
    const msg = result.error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};
