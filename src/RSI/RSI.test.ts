import RSI from "./index";

test("RSI calculates properly", () => {
  const rsi = new RSI(6);
  [
    [1, null],
    [2, null],
    [3, null],
    [4, null],
    [5, null],
    [6, null],
    [7, 100],
    [5, 71.42857142857143],
  ].forEach(([val, result]) => {
    expect(rsi.next(val as number)).toBe(result);
  });
});
