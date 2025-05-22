const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

// definim o extensie care are la baza type-ul string din JOI
// si in care verificam cu ajutorul pachetului sanitize-html
// daca exista vreun cod sau incercare de atac xss.
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} nu trebuie sa includa HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

// Facem un model pentru review ca sa-l validam local
// si sa nu mai facem nicio cerere catre baza de date
exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required().escapeHTML(),
  }).required(),
});
