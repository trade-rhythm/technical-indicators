import Cross from "./index";

test("Cross over correctly", () => {
  const cross = new Cross();
  expect(cross.over(5, 10)).toBeFalsy();
  expect(cross.over(8, 10)).toBeFalsy();
  expect(cross.over(10, 10)).toBeFalsy();
  expect(cross.over(11, 10)).toBeTruthy();
});

test("Cross under correctly", () => {
  const cross = new Cross();
  expect(cross.under(15, 10)).toBeFalsy();
  expect(cross.under(18, 10)).toBeFalsy();
  expect(cross.under(10, 10)).toBeFalsy();
  expect(cross.under(9, 10)).toBeTruthy();
});

test("Cross correctly", () => {
  const cross = new Cross();
  expect(cross.cross(15, 10)).toBeFalsy();
  expect(cross.cross(18, 10)).toBeFalsy();
  expect(cross.cross(10, 10)).toBeFalsy();
  expect(cross.cross(9, 10)).toBeTruthy();
  expect(cross.cross(11, 10)).toBeTruthy();
});

test("Cross serializes/deserializes correctly", () => {
  const cross = new Cross();
  cross.over(5, 10);
  const json = JSON.stringify(cross);
  const newCross = Cross.from(JSON.parse(json));
  expect(newCross.isOver).toBe(cross.isOver);
});
