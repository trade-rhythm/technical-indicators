import SD from "./index";

test("SD calculates correctly", () => {
  const sd = new SD(3);
  [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
  ].forEach(([val, result]) => {
    expect(sd.next(val)).toBe(result);
  });
});

test("SD calculates correctly", () => {
  const sd = new SD(4);
  [
    [10, 0],
    [20, 5],
    [30, 8.165],
    [20, 7.071],
    [10, 7.071],
    [100, 35.355],
  ].forEach(([val, result]) => {
    expect(sd.next(val)).approx(result, 0.001);
  });
});

test("SD serializes/deserializes correctly", () => {
  const sd = new SD();
  sd.next(1);
  const json = JSON.stringify(sd);
  const newSD = SD.from(JSON.parse(json));
  expect(newSD).toEqual(sd);
});
