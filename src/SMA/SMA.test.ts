import SMA from "./index";
import Window from "../Window";

test("SMA calculates correctly", () => {
  const sma = new SMA(4);
  [
    [4, 4],
    [5, 4.5],
    [6, 5],
    [6, 5.25],
    [6, 5.75],
    [6, 6],
    [2, 5],
  ].forEach(([val, result]) => {
    expect(sma.next(val)).toBe(result);
  });
});

test("SMA serializes/deserializes correctly", () => {
  const ma = new SMA(3);
  ma.next(10.2);
  ma.next(10.8);
  ma.next(11.3);
  ma.next(10.4);
  const json = JSON.stringify(ma);
  const newMa = SMA.from(JSON.parse(json));
  expect(ma.period).toBe(newMa.period);
  expect(ma.window instanceof Window).toBe(true);
  expect(ma.current).toBe(newMa.current);
});
