import MFI from "./index";

test("MFI calculates correctly", () => {
  const mfi = new MFI(3);
  [
    // h, l, c, v, result
    [3, 1, 2, 500, 50],
    [2.3, 2, 2.3, 1000, 100],
    [9, 7, 8, 200, 100],
    [5, 3, 4, 500, 65.517],
    [4, 2, 3, 5000, 8.602],
    [2, 1, 1.5, 6000, 0],
    [2, 2, 2, 7000, 36.842],
    [2, 2, 2, 7000, 60.87],
  ].forEach(([h, l, c, v, result]) => {
    expect(+mfi.nextBar({ h, l, c, v }).toFixed(3)).toBe(result);
  });
});

test("MFI serializes/deserializes correctly", () => {
  const mfi = new MFI(3);
  mfi.nextBar({ h: 3, l: 1, c: 2, v: 500 });
  const json = JSON.stringify(mfi);
  const newMFI = MFI.from(JSON.parse(json));
  expect(newMFI).toEqual(mfi);
});
