import CCI from "./index";

test("CCI calculates correctly", () => {
  const cci = new CCI(5);

  const bar1 = { h: 2, l: 1, c: 1.5, o: 1.5 };
  expect(+cci.nextBar(bar1).toFixed(3)).toBe(0);

  const bar2 = { h: 5, l: 3, c: 4, o: 1.5 };
  expect(+cci.nextBar(bar2).toFixed(3)).toBe(66.667);

  const bar3 = { h: 9, l: 7, c: 8, o: 1.5 };
  expect(+cci.nextBar(bar3).toFixed(3)).toBe(100);

  const bar4 = { h: 5, l: 3, c: 4, o: 1.5 };
  expect(+cci.nextBar(bar4).toFixed(3)).toBe(-13.793);

  const bar5 = { h: 5, l: 3, c: 4, o: 1.5 };
  expect(+cci.nextBar(bar5).toFixed(3)).toBe(-13.514);

  const bar6 = { h: 2, l: 1, c: 1.5, o: 1.5 };
  expect(+cci.nextBar(bar6).toFixed(3)).toBe(-126.126);
});

test("CCI serializes/deserializes correctly", () => {
  const cci = new CCI();
  cci.next(1);
  const json = JSON.stringify(cci);
  const newCCI = CCI.from(JSON.parse(json));
  expect(newCCI).toEqual(cci);
});
