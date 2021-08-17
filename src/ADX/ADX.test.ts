import ADX from "./index";

test("ADX calculates correctly", () => {
  const adx = new ADX(5);
  [
    // high, low, close, result
    [82.15, 81.29, 81.59, null],
    [81.89, 80.64, 81.06, null],
    [83.03, 81.31, 82.87, null],
    [83.3, 82.65, 83.0, null],
    [83.85, 83.07, 83.61, null],
    [83.9, 83.11, 83.15, null],
    [83.33, 82.49, 82.84, null],
    [84.3, 82.3, 83.99, null],
    [84.84, 84.15, 84.55, 42.02843532361666],
    [85.0, 84.11, 84.36, 45.030197751280795],
    [85.9, 84.03, 85.53, 50.278112805162785],
    [86.58, 85.39, 86.54, 55.845790397341815],
    [86.98, 85.76, 86.89, 60.952506055817096],
    [88.0, 87.17, 87.77, 66.23762155833865],
    [87.87, 87.01, 87.29, 68.23912145931837],
  ].forEach(([high, low, close, result]) => {
    expect(adx.nextBar({ high, low, close })).toBe(result);
  });
});

test("ADX serializes/deserializes correctly", () => {
  const adx = new ADX(3);
  adx.nextBar({ high: 3, low: 1, close: 2 });
  adx.nextBar({ high: 3, low: 1, close: 2 });
  adx.nextBar({ high: 3, low: 1, close: 2 });
  const json = JSON.stringify(adx);
  const newADX = ADX.from(JSON.parse(json));
  expect(newADX).toEqual(adx);
});
