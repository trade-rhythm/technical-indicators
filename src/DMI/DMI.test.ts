import DMI from "./index";

test("DMI calculates correctly", () => {
  const dmi = new DMI(5);
  [
    // high, low, close, result
    [82.15, 81.29, 81.59, null],
    [81.89, 80.64, 81.06, null],
    [83.03, 81.31, 82.87, null],
    [83.3, 82.65, 83.0, null],
    [83.85, 83.07, 83.61, 52.68425841674205],
    [83.9, 83.11, 83.15, 53.99247953992465],
    [83.33, 82.49, 82.84, 7.795927847023168],
    [84.3, 82.3, 83.99, 41.88861985472129],
    [84.84, 84.15, 84.55, 53.78089095967214],
    [85.0, 84.11, 84.36, 57.03724746193731],
    [85.9, 84.03, 85.53, 71.26977302069074],
    [86.58, 85.39, 86.54, 78.11650076605797],
    [86.98, 85.76, 86.89, 81.37936868971823],
    [88.0, 87.17, 87.77, 87.37808356842487],
    [87.87, 87.01, 87.29, 76.24512106323728],
  ].forEach(([high, low, close, result]) => {
    expect(dmi.nextBar({ high, low, close })).toBe(result);
  });
});

test("DMI serializes/deserializes correctly", () => {
  const dmi = new DMI(3);
  dmi.nextBar({ high: 3, low: 1, close: 2 });
  dmi.nextBar({ high: 3, low: 1, close: 2 });
  dmi.nextBar({ high: 3, low: 1, close: 2 });
  const json = JSON.stringify(dmi);
  const newDMI = DMI.from(JSON.parse(json));
  expect(newDMI).toEqual(dmi);
});
