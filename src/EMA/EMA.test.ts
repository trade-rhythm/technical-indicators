import EMA from "./index";

test("EMA calculates correctly", () => {
  const ema = new EMA(6);
  [
    [1, 1],
    [2, 1.5],
    [3, 2],
    [4, 2.5],
    [5, 3],
    [6, 3.5],
    [10, 5.35705],
  ].forEach(([val, result]) => {
    expect(ema.next(val)).toBe(result);
  });
});

test("EMA serializes/deserializes correctly", () => {
  const ema = new EMA(6);
  ema.next(10.2);
  ema.next(10.8);
  ema.next(11.3);
  ema.next(10.4);
  const json = JSON.stringify(ema);
  const newEma = EMA.from(JSON.parse(json));
  expect(newEma.next(10)).toEqual(ema.next(10))
});
