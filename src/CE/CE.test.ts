import CE, { Chandelier } from "./index";

const round = (v: Chandelier): Chandelier => ({
  long: +v.long.toFixed(2),
  short: +v.short.toFixed(2),
});

test("CE calculates correctly", () => {
  const ce = new CE(5, 2);

  const val1 = ce.nextBar({ high: 2, low: 1, close: 1.5, open: 1.5 });
  expect(round(val1)).toStrictEqual({
    long: 0,
    short: 3,
  });

  const val2 = ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  expect(round(val2)).toStrictEqual({
    long: 1.33,
    short: 4.67,
  });

  const val3 = ce.nextBar({ high: 9, low: 7, close: 8, open: 1.5 });
  expect(round(val3)).toStrictEqual({
    long: 3.22,
    short: 6.78,
  });

  const val4 = ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  expect(round(val4)).toStrictEqual({
    long: 1.81,
    short: 8.19,
  });

  const val5 = ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  expect(round(val5)).toStrictEqual({
    long: 2.88,
    short: 7.12,
  });

  const val6 = ce.nextBar({ high: 2, low: 1, close: 1.5, open: 1.5 });
  expect(round(val6)).toStrictEqual({
    long: 2.92,
    short: 7.08,
  });
});

test("CE serializes/deserializes correctly", () => {
  const ce = new CE(5, 2);
  ce.nextBar({ high: 2, low: 1, close: 1.5, open: 1.5 });
  ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  ce.nextBar({ high: 9, low: 7, close: 8, open: 1.5 });
  ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  ce.nextBar({ high: 5, low: 3, close: 4, open: 1.5 });
  ce.nextBar({ high: 2, low: 1, close: 1.5, open: 1.5 });
  const json = JSON.stringify(ce);
  const newCE = CE.from(JSON.parse(json));
  expect(newCE).toEqual(ce);
});
