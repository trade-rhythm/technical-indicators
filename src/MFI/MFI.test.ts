import MFI from "./index";

test("MFI calculates correctly", () => {
  const mfi = new MFI(3);
  [
    // high, low, close, volume, result
    [3, 1, 2, 500, 50],
    [2.3, 2, 2.3, 1000, 100],
    [9, 7, 8, 200, 100],
    [5, 3, 4, 500, 65.517],
    [4, 2, 3, 5000, 8.602],
    [2, 1, 1.5, 6000, 0],
    [2, 2, 2, 7000, 36.842],
    [2, 2, 2, 7000, 60.87],
  ].forEach(([high, low, close, volume, result]) => {
    expect(+mfi.nextBar({ high, low, close, volume }).toFixed(3)).toBe(result);
  });
});

test("MFI serializes/deserializes correctly", () => {
  const mfi = new MFI(3);
  mfi.nextBar({ high: 3, low: 1, close: 2, volume: 500 });
  const json = JSON.stringify(mfi);
  const newMFI = MFI.from(JSON.parse(json));
  expect(newMFI).toEqual(mfi);
});
