const { reviewSchema } = require("./schemas");

// definim un grup de testare unitare cu ajutorul functiei describe
describe("reviewSchema", () => {
  // in primul test verificam daca un review corect
  // produce vreo eroare.
  it("accepts valid review input", () => {
    const validData = {
      review: {
        rating: 5,
        comment: "Foarte bun!",
      },
    };

    const { error } = reviewSchema.validate(validData);
    expect(error).toBeUndefined();
  });

  // in al doilea test verificam comportamentul modelului
  // atunci cand lipseste rating-ul
  it("rejects missing rating", () => {
    const invalidData = {
      review: {
        comment: "Lipseste ratingul.",
      },
    };

    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/rating/);
  });

  // in acest test verificam comportamentul modelului
  // atunci cand lipseste mesajul review-ului
  it("rejects missing comment", () => {
    const invalidData = {
      review: {
        rating: 3,
      },
    };

    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/comment/);
  });

  // verificam comportamentul modelului atunci cand
  // rating-ul este mai mic decat 1
  it("rejects rating out of range (<1)", () => {
    const invalidData = {
      review: {
        rating: 0,
        comment: "Prea mic!",
      },
    };

    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(
      /must be greater than or equal to 1/
    );
  });

  // verificam comportamentul modelului atunci cand
  // rating-ul este mai mare decat 5
  it("rejects rating out of range (>5)", () => {
    const invalidData = {
      review: {
        rating: 6,
        comment: "Prea mare!",
      },
    };

    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/must be less than or equal to 5/);
  });

  // comportamentul modelului atunci cand obiectul
  // review lipseste total
  it("rejects missing review object entirely", () => {
    const invalidData = {};
    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/"review" is required/);
  });
});
