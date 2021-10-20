import OBV from "./index";

test("OBV calculates correctly", () => {
  const obv = new OBV();
  [
    // close, volume, result
    [1.5, 1000, 1000],
    [5, 5000, 6000],
    [4, 9000, -3000],
    [4, 4000, -3000],
  ].forEach(([c, v, result]) => {
    expect(obv.nextBar({ c, v })).toBe(result);
  });
});

test("OBV serializes/deserializes correctly", () => {
  const obv = new OBV();
  obv.nextBar({ c: 5, v: 5000 });
  const json = JSON.stringify(obv);
  const newOBV = OBV.from(JSON.parse(json));
  expect(newOBV).toEqual(obv);
});
