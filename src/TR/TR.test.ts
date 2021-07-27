import TR from "./index";

test("TR calculates correctly", () => {
  const tr = new TR();
  [
    [2.5, 0],
    [3.6, 1.1],
    [3.3, 0.3],
  ].forEach(([val, result]) => {
    expect(tr.next(val)).approx(result);
  });
});

test("TR serializes/deserializes correctly", () => {
  const tr = new TR();
  tr.next(2.5);
  tr.next(3.6);
  const json = JSON.stringify(tr);
  const newTR = TR.from(JSON.parse(json));
  expect(newTR.next(1.5)).toEqual(tr.next(1.5));
});
