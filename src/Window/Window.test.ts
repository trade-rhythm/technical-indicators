import Window from "./index";

test("Window is a circular buffer", () => {
  const w = new Window(3);
  w.init(1);
  expect(w.push(2)).toBe(1);
  expect(w.push(3)).toBe(1);
  expect(w.push(4)).toBe(1);
  expect(w.push(5)).toBe(2);
  expect(w.push(6)).toBe(3);
});

test("Window is a returns iterable", () => {
  const w = new Window(3);
  w.init(1);
  expect(w.values()).toStrictEqual([1, 1, 1]);
});

test("Window serializes/deserializes correctly", () => {
  const w = new Window(3);
  w.init(1);
  const json = JSON.stringify(w);
  const newWindow = Window.from(JSON.parse(json));
  expect(newWindow.size).toBe(w.size);
  expect(newWindow.index).toBe(w.index);
});
