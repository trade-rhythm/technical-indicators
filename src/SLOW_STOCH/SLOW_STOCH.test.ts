import SLOW_STOCH from "./index";

test("SLOW_STOCH calculates correctly", () => {
  const stoch = new SLOW_STOCH(3, 2);
  expect(stoch.next(10.0)).toBe(50.0);
  expect(+stoch.next(50.0).toFixed(2)).toBe(83.33);
  expect(+stoch.next(50.0).toFixed(2)).toBe(94.44);
  expect(+stoch.next(30.0).toFixed(2)).toBe(31.48);
  expect(+stoch.next(55.0).toFixed(2)).toBe(77.16);
});

test("SLOW_STOCH calculates correctly with bar", () => {
  const stoch = new SLOW_STOCH(3, 2);
  [
    [30.0, 10.0, 25.0, 75.0],
    [20.0, 20.0, 20.0, 58.33],
    [40.0, 20.0, 16.0, 32.78],
    [35.0, 15.0, 19.0, 21.59],
    [30.0, 20.0, 25.0, 33.86],
    [35.0, 25.0, 30.0, 61.29],
  ].forEach(([high, low, close, result]) => {
    expect(+stoch.nextBar({ high, low, close }).toFixed(2)).toBe(result);
  });
});

test("SLOW_STOCH serializes/deserializes correctly", () => {
  const slow_stoch = new SLOW_STOCH(3, 2);
  slow_stoch.next(1);
  const json = JSON.stringify(slow_stoch);
  const newSLOW_STOCH = SLOW_STOCH.from(JSON.parse(json));
  expect(newSLOW_STOCH).toEqual(slow_stoch);
});
