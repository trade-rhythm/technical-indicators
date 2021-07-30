import ROC from "./index";

test("ROC calculates correctly", () => {
  const roc = new ROC(3);
  [
    [10, 0],
    [10.4, 4],
    [10.57, 5.7],
    [10.8, 8],
    [10.9, 4.808],
    [10, -5.393],
  ].forEach(([val, result]) => {
    expect(+roc.next(val).toFixed(3)).toBe(result);
  });
});

test("ROC serializes/deserializes correctly", () => {
  const roc = new ROC(3);
  roc.next(1);
  const json = JSON.stringify(roc);
  const newROC = ROC.from(JSON.parse(json));
  expect(newROC).toEqual(roc);
});
