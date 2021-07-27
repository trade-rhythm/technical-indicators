import { gt, lt, eq, gte, lte, neq } from "./index";

// note that because of floating point math
// 0.2 + 0.1 = 0.30000000000000004

test("not equals", () => {
  expect(neq(0.2 + 0.1, 0.3)).toBe(false);
});

test("equals", () => {
  expect(eq(0.2 + 0.1, 0.3)).toBe(true);
});

test("equals big", () => {
  expect(eq(1000000000.2 + 1000000000.1, 2000000000.3)).toBe(true);
});

test("less than", () => {
  expect(lt(0.2 + 0.1, 0.3)).toBe(false);
});

test("less than or equals", () => {
  expect(lte(0.2 + 0.1, 0.3)).toBe(true);
});

test("greater than", () => {
  expect(gt(0.2 + 0.1, 0.3)).toBe(false);
});

test("greater than or equals", () => {
  expect(gte(0.2 + 0.1, 0.3)).toBe(true);
});
