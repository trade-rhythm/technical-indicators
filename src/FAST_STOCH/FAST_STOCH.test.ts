import FAST_STOCH from "./index";

test("FAST_STOCH calculates correctly", () => {
  const fast_stoch = new FAST_STOCH(3);
  [
    [0, 50],
    [200, 100],
    [100, 50],
    [120, 20],
    [115, 75]
  ].forEach(([val, result]) => {
    expect(fast_stoch.next(val)).toBe(result);
  });
});

test("FAST_STOCH calculates correctly with bar", () => {
  const fast_stoch = new FAST_STOCH(3);
  [
    [20.0, 20.0, 20.0, 50.0], // min = 20, max = 20
    [30.0, 10.0, 25.0, 75.0], // min = 10, max = 30
    [40.0, 20.0, 16.0, 20.0], // min = 10, max = 40
    [35.0, 15.0, 19.0, 30.0], // min = 10, max = 40
    [30.0, 20.0, 25.0, 40.0], // min = 15, max = 40
    [35.0, 25.0, 30.0, 75.0] // min = 15, max = 35
  ].forEach(([high, low, close, result]) => {
    expect(fast_stoch.nextBar({ high, low, close })).toBe(result);
  });
});

test("FAST_STOCH serializes/deserializes correctly", () => {
  const fast_stoch = new FAST_STOCH();
  fast_stoch.next(1);
  const json = JSON.stringify(fast_stoch);
  const newFAST_STOCH = FAST_STOCH.from(JSON.parse(json));
  expect(newFAST_STOCH).toEqual(fast_stoch);
});
