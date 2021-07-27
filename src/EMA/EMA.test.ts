import EMA from "./index";

test("EMA calculates correctly", () => {
  const ema = new EMA(3);
  [
    [2, 2],
    [5, 3.5],
    [1, 2.25],
    [6.25, 4.25],
  ].forEach(([val, result]) => {
    expect(+ema.next(val).toFixed(2)).toBe(result);
  });
});

test("EMA serializes/deserializes correctly", () => {
  const ema = new EMA(34);
  ema.next(10.2);
  ema.next(10.8);
  ema.next(11.3);
  ema.next(10.4);
  const json = JSON.stringify(ema);
  const newEma = EMA.from(JSON.parse(json));
  expect(ema.period).toBe(newEma.period);
  expect(ema.k).toBe(newEma.k);
  expect(ema.current).toBe(newEma.current);
});
