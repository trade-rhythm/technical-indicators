import SMA from "./index";
import Window from "../core/window";

test("SMA calculates correctly", () => {
  const ma = new SMA(3);
  ma.next(10.2);
  ma.next(10.8);
  ma.next(11.3);
  ma.next(10.4);
  expect(ma.current).toBe(10.833333333333334);
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
