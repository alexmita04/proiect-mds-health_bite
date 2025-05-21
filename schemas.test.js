const { reviewSchema } = require("./schemas");

describe("reviewSchema", () => {
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

  it("rejects missing review object entirely", () => {
    const invalidData = {};
    const { error } = reviewSchema.validate(invalidData);
    expect(error).toBeDefined();
    expect(error.details[0].message).toMatch(/"review" is required/);
  });
});
