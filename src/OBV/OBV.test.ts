import OBV from "./index";

test("OBV calculates correctly", () => {
  const obv = new OBV();
  [
    // close, volume, result
    [1.5, 1000, 1000],
    [5, 5000, 6000],
    [4, 9000, -3000],
    [4, 4000, -3000],
  ].forEach(([close, volume, result]) => {
    expect(obv.nextBar({ close, volume })).toBe(result);
  });
});

test("OBV serializes/deserializes correctly", () => {
  const obv = new OBV();
  obv.nextBar({ close: 5, volume: 5000 });
  const json = JSON.stringify(obv);
  const newOBV = OBV.from(JSON.parse(json));
  expect(newOBV).toEqual(obv);
});
