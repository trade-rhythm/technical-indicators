import ATR from "./index";

test("ATR calculates correctly", () => {
  const atr = new ATR(3);
  const bar1 = { h: 10, l: 7.5, c: 9, o: 9 };
  const bar2 = { h: 11, l: 9, c: 9.5, o: 9 };
  const bar3 = { h: 9, l: 5, c: 8, o: 9 };
  expect(atr.nextBar(bar1).toFixed(2)).toBe("2.50");
  expect(atr.nextBar(bar2).toFixed(2)).toBe("2.25");
  expect(atr.nextBar(bar3).toFixed(2)).toBe("3.38");
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
