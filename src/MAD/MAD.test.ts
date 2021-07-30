import MAD from "./index";

test("MAD calculates correctly", () => {
  const mad = new MAD(5);
  [
    [1.5, 0],
    [4, 1.25],
    [8, 2.333],
    [4, 1.813],
    [4, 1.48],
    [1.5, 1.48],
  ].forEach(([val, result]) => {
    expect(+mad.next(val).toFixed(3)).toBe(result);
  });
});

test("MAD serializes/deserializes correctly", () => {
  const mad = new MAD(5);
  mad.next(1);
  const json = JSON.stringify(mad);
  const newMAD = MAD.from(JSON.parse(json));
  expect(newMAD).toEqual(mad);
});
