import BB from "./index";

test("BB calculates correctly", () => {
  const bb = new BB(3, 2);
  const a = bb.next(2);
  const b = bb.next(5);
  const c = bb.next(1);
  const d = bb.next(6.25);

  expect(a.average).toBe(2);
  expect(b.average).toBe(3.5);
  expect(c.average.toFixed(3)).toBe("2.667");
  expect(d.average.toFixed(3)).toBe("4.083");

  expect(a.upper).toBe(2);
  expect(b.upper).toBe(6.5);
  expect(c.upper.toFixed(3)).toBe("6.066");
  expect(d.upper.toFixed(3)).toBe("8.562");

  expect(a.lower).toBe(2);
  expect(b.lower).toBe(0.5);
  expect(c.lower.toFixed(3)).toBe("-0.733");
  expect(d.lower.toFixed(3)).toBe("-0.395");
});

test("BB serializes/deserializes correctly", () => {
  const bb = new BB();
  bb.next(1);
  const json = JSON.stringify(bb);
  const newBB = BB.from(JSON.parse(json));
  expect(newBB).toEqual(bb);
});
