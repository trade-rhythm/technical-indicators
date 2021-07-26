import Fast from "./index";

test("Fast calculates correctly", () => {
  const fast = new Fast(0.01);
	fast.add(0.02);
	expect(fast.valueOf()).toBe(0.03);
});

test("Fast serializes/deserializes correctly", () => {
  const fast = new Fast(1.1);
  const json = JSON.stringify(fast);
  const newFast = Fast.from(JSON.parse(json));
  expect(newFast).toEqual(fast);
});
