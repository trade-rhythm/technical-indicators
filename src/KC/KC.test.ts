import KC from "./index";

const round = (v: number) => +v.toFixed(2);

test("KC calculates correctly", () => {
  const kc = new KC(3, 2);
  const a = kc.next(2.0);
  const b = kc.next(5.0);
  const c = kc.next(1.0);
  const d = kc.next(6.25);

  expect(round(a.average)).toBe(2.0);
  expect(round(b.average)).toBe(3.5);
  expect(round(c.average)).toBe(2.25);
  expect(round(d.average)).toBe(4.25);

  expect(round(a.upper)).toBe(2.0);
  expect(round(b.upper)).toBe(6.5);
  expect(round(c.upper)).toBe(7.75);
  expect(round(d.upper)).toBe(12.25);

  expect(round(a.lower)).toBe(2.0);
  expect(round(b.lower)).toBe(0.5);
  expect(round(c.lower)).toBe(-3.25);
  expect(round(d.lower)).toBe(-3.75);
});

test("KC serializes/deserializes correctly", () => {
  const kc = new KC(3, 2);
  kc.next(1);
  const json = JSON.stringify(kc);
  const newKC = KC.from(JSON.parse(json));
  expect(newKC).toEqual(kc);
});
