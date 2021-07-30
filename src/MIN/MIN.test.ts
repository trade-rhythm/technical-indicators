import MIN from "./index";

test("Minimum calculates correctly", () => {
  const min = new MIN(3);
  [
    [4, 4],
    [1.2, 1.2],
    [5.0, 1.2],
    [3.0, 1.2],
    [4.0, 3],
    [6.0, 3],
    [7.0, 4],
    [8.0, 6],
    [-9.0, -9],
    [0, -9],
  ].forEach(([val, result]) => {
    expect(min.next(val)).toBe(result);
  });
});

test("Minimum serializes/deserializes correctly", () => {
  const min = new MIN(3);
  min.next(1);
  min.next(2);
  min.next(3);
  const json = JSON.stringify(min);
  const newMin = MIN.from(JSON.parse(json));
  expect(newMin).toEqual(min);
});
