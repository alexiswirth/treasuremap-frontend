import { parseTreasureMap, Map } from "./parser";

describe("parseTreasureMap", () => {
  it("should parse a simple map with dimensions", () => {
    const data = "C - 3 - 4";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 3,
      height: 4,
      mountains: [],
      treasures: [],
      adventurers: [],
    };

    expect(result).toEqual(expected);
  });

  it("should parse a map with mountains", () => {
    const data = "C - 5 - 5\nM - 1 - 1\nM - 2 - 3";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 5,
      height: 5,
      mountains: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
      ],
      treasures: [],
      adventurers: [],
    };

    expect(result).toEqual(expected);
  });

  it("should parse a map with treasures", () => {
    const data = "C - 6 - 6\nT - 2 - 2 - 3\nT - 4 - 5 - 1";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 6,
      height: 6,
      mountains: [],
      treasures: [
        { x: 2, y: 2, count: 3 },
        { x: 4, y: 5, count: 1 },
      ],
      adventurers: [],
    };

    expect(result).toEqual(expected);
  });

  it("should parse a map with adventurers", () => {
    const data = "C - 8 - 8\nA - Lara - 1 - 1 - N - 0\nA - Max - 2 - 3 - S - 1";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 8,
      height: 8,
      mountains: [],
      treasures: [],
      adventurers: [
        { name: "Lara", x: 1, y: 1, orientation: "N", treasuresCollected: 0 },
        { name: "Max", x: 2, y: 3, orientation: "S", treasuresCollected: 1 },
      ],
    };

    expect(result).toEqual(expected);
  });

  it("should parse a complex map with all elements", () => {
    const data = "C - 10 - 10\nM - 1 - 2\nM - 3 - 4\nT - 5 - 5 - 2\nT - 6 - 6 - 3\nA - Alice - 0 - 0 - E - 0\nA - Bob - 9 - 9 - W - 1\n";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 10,
      height: 10,
      mountains: [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
      ],
      treasures: [
        { x: 5, y: 5, count: 2 },
        { x: 6, y: 6, count: 3 },
      ],
      adventurers: [
        { name: "Alice", x: 0, y: 0, orientation: "E", treasuresCollected: 0 },
        { name: "Bob", x: 9, y: 9, orientation: "W", treasuresCollected: 1 },
      ],
    };

    expect(result).toEqual(expected);
  });

  it("should return an empty map if no data is provided", () => {
    const data = "";

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 0,
      height: 0,
      mountains: [],
      treasures: [],
      adventurers: [],
    };

    expect(result).toEqual(expected);
  });

  it("should ignore unknown lines", () => {
    const data = `
      C - 5 - 5
      X - 1 - 1
    `;

    const result = parseTreasureMap(data);

    const expected: Map = {
      width: 5,
      height: 5,
      mountains: [],
      treasures: [],
      adventurers: [],
    };

    expect(result).toEqual(expected);
  });
});
