import Big from "./index";

test("Big calculates correctly", () => {
  const x = new Big(0.1);
  const sum = x.add(0.2);
  expect(sum.valueOf()).toBe(0.3);
});

test("Big serializes/deserializes correctly", () => {
  const x = new Big(0.1);
  const y = new Big(0.2);
  const sum = x.add(y);
  const json = JSON.stringify(sum);
  const newBig = Big.from(JSON.parse(json));
  expect(newBig.valueOf()).toEqual(sum.valueOf());
});
