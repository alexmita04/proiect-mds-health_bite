// ExpressError este o clasa derivata din clasa Error, pe care o vom
// folosi pentru a crea erori custom
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
