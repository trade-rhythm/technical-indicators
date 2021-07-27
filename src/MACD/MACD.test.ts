import MACD, { MACDOutput } from "./index";

const round = (v: MACDOutput): MACDOutput => ({
  macd: +v.macd.toFixed(2),
  signal: +v.signal.toFixed(2),
  histogram: +v.histogram.toFixed(2)
});

test("MACD caluclates correctly", () => {
  const macd = new MACD(3, 6, 4);
  expect(round(macd.next(2))).toStrictEqual({
    macd: 0,
    signal: 0,
    histogram: 0
  });
  expect(round(macd.next(3))).toStrictEqual({
    macd: 0.21,
    signal: 0.09,
    histogram: 0.13
  });
  expect(round(macd.next(4.2))).toStrictEqual({
    macd: 0.52,
    signal: 0.26,
    histogram: 0.26
  });
  expect(round(macd.next(7))).toStrictEqual({
    macd: 1.15,
    signal: 0.62,
    histogram: 0.54
  });
  expect(round(macd.next(6.7))).toStrictEqual({
    macd: 1.15,
    signal: 0.83,
    histogram: 0.32
  });
  expect(round(macd.next(6.5))).toStrictEqual({
    macd: 0.94,
    signal: 0.87,
    histogram: 0.07
  });
});

test("MACD serializes/deserializes correctly", () => {
  const macd = new MACD(3, 6);
  macd.next(2.5);
  macd.next(3.6);
  const json = JSON.stringify(macd);
  const newMACD = MACD.from(JSON.parse(json));
  expect(newMACD.next(1.5)).toEqual(macd.next(1.5));
});
