import MAX from "./index";

test("MAX calculates correctly", () => {
  const max = new MAX(3);
  [
    [4.0, 4.0],
    [1.2, 4.0],
    [5.0, 5.0],
    [3.0, 5.0],
    [4.0, 5.0],
    [0.0, 4.0],
    [-1.0, 4.0],
    [-2.0, 0.0],
    [-1.5, -1.0]
  ].forEach(([val, result]) => {
    expect(max.next(val)).toBe(result);
  });
});

test("MAX serializes/deserializes correctly", () => {
  const max = new MAX(3);
  max.next(1);
  max.next(2);
  max.next(3);
  const json = JSON.stringify(max);
  const newMax = MAX.from(JSON.parse(json));
  expect(newMax).toEqual(max);
});
