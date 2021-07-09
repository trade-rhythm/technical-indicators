import EMA from "./index";

test("EMA calculates correctly", () => {
  const ema = new EMA(34);
  ema.next(10.2);
  ema.next(10.8);
  ema.next(11.3);
  ema.next(10.4);
  expect(ema.current).toBe(10.301173177842564);
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
