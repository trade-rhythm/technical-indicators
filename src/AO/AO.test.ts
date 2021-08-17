import AO from "./index";

test("AO calculates correctly", () => {
  const ao = new AO(3, 5);
  [
    [2, 1, 0],
    [3, 1, 0],
    [4, 1, 0],
    [5, 1, 0.25],
    [5, 4, 0.633],
    [5, 5, 0.767],
    [3, 2, 0.5],
    [2, 1, -0.3],
    [1, 0.5, -1.267],
  ].forEach(([high, low, result]) => {
    expect(+ao.nextBar({ high, low }).toFixed(3)).toBe(result);
  });
});

test("AO serializes/deserializes correctly", () => {
  const ao = new AO();
  ao.nextBar({ high: 2, low: 1 });
  ao.nextBar({ high: 2, low: 1 });
  ao.nextBar({ high: 2, low: 1 });
  const json = JSON.stringify(ao);
  const newAO = AO.from(JSON.parse(json));
  expect(newAO).toEqual(ao);
});
