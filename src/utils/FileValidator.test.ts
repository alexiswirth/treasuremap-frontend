import FileValidator from "./FileValidator";

describe("FileValidator", () => {
  let fileValidator: FileValidator;

  beforeEach(() => {
    fileValidator = new FileValidator();
  });

  it("should validate a correct map file", () => {
    const validContent = "C - 4 - 5\nM - 1 - 1\nT - 2 - 3 - 2\nA - Lara - 0 - 0 - N - ADG";

    expect(() => fileValidator.validate(validContent)).not.toThrow();
  });

  it("should throw an error for invalid map dimensions", () => {
    const invalidContent = "C - X - 5";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 1: Wrong dimension of the map"
    );
  });

  it("should throw an error for invalid mountain coordinates", () => {
    const invalidContent = "C - 4 - 5\nM - X - 1";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 2: Coordinates of the mountain invalid"
    );
  });

  it("should throw an error for invalid treasure coordinates or count", () => {
    const invalidContent = "C - 4 - 5\nT - 2 - Y - 3";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 2: Coordinates or number of chess invalid"
    );
  });

  it("should throw an error for invalid adventurer orientation", () => {
    const invalidContent = "C - 4 - 5\nA - Lara - 0 - 0 - X - ADG";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 2: Wrong values for adventurer"
    );
  });

  it("should throw an error for invalid adventurer movements", () => {
    const invalidContent = "C - 4 - 5\nA - Lara - 0 - 0 - N - XYZ";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 2: Wrong values for adventurer"
    );
  });

  it("should throw an error for unknown line types", () => {
    const invalidContent = "C - 4 - 5\nX - 1 - 1";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error at line 2: unknown value."
    );
  });

  it("should throw an error if map dimensions are not defined", () => {
    const invalidContent = "M - 1 - 1";

    expect(() => fileValidator.validate(invalidContent)).toThrow(
      "Error: The dimension of the map (C) must be defined"
    );
  });

  it("should validate a map with multiple elements", () => {
    const validContent = "C - 5 - 5\nM - 0 - 0\nM - 1 - 1\nT - 3 - 3 - 5\nT - 4 - 4 - 3\nA - John - 2 - 2 - E - ADG";

    expect(() => fileValidator.validate(validContent)).not.toThrow();
  });
});
