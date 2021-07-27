import ATR from "./index";

test("ATR calculates correctly", () => {
  const atr = new ATR(3);
  [
    [1, 0],
    [2, 0.5],
    [3, 2 / 3],
    [4, 5 / 6],
  ].forEach(([val, result]) => {
    expect(atr.next(val)).approx(result);
  });
});

test("ATR serializes/deserializes correctly", () => {
  const atr = new ATR(3);
  atr.next(1);
  atr.next(2);
  atr.next(3);
  const json = JSON.stringify(atr);
  const newATR = ATR.from(JSON.parse(json));
  expect(atr.next(2.3)).toEqual(newATR.next(2.3));
});
