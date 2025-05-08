// functia catchAsync este o functie utilitara care ne ajuta sa dam "wrap"
// unei functii asincrone cu block-urile try si catch

function catchAsync(func) {
  return async function (req, res, next) {
    try {
      await func(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = catchAsync;
