import MACD from "./index";

test("MACD caluclates correctly", () => {
  const macd = new MACD(3, 6);
  [
    [1, null],
    [2, null],
    [3, null],
    [4, null],
    [5, null],
    [6, 1.5],
    [14, 3.00015],
  ].forEach(([val, result]) => {
    expect(macd.next(val as number)).toBe(result);
  });
});

test("MACD serializes/deserializes correctly", () => {
  const macd = new MACD(3, 6);
  const json = JSON.stringify(macd);
  const newMACD = MACD.from(JSON.parse(json));
  expect(macd.next(5)).toEqual(newMACD.next(5));
});
