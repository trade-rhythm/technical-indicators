import CCI from "./index";

test("CCI calculates correctly", () => {
  const cci = new CCI(5);

  const bar1 = { high: 2, low: 1, close: 1.5, open: 1.5 };
  expect(+cci.nextBar(bar1).toFixed(3)).toBe(0);

  const bar2 = { high: 5, low: 3, close: 4, open: 1.5 };
  expect(+cci.nextBar(bar2).toFixed(3)).toBe(66.667);

  const bar3 = { high: 9, low: 7, close: 8, open: 1.5 };
  expect(+cci.nextBar(bar3).toFixed(3)).toBe(100);

  const bar4 = { high: 5, low: 3, close: 4, open: 1.5 };
  expect(+cci.nextBar(bar4).toFixed(3)).toBe(-13.793);

  const bar5 = { high: 5, low: 3, close: 4, open: 1.5 };
  expect(+cci.nextBar(bar5).toFixed(3)).toBe(-13.514);

  const bar6 = { high: 2, low: 1, close: 1.5, open: 1.5 };
  expect(+cci.nextBar(bar6).toFixed(3)).toBe(-126.126);
});

test("CCI serializes/deserializes correctly", () => {
  const cci = new CCI();
  cci.next(1);
  const json = JSON.stringify(cci);
  const newCCI = CCI.from(JSON.parse(json));
  expect(newCCI).toEqual(cci);
});
