import { EMA, Cross, parse } from "./main";

test("Parse parses correctly", () => {
  const ema = new EMA(3);
  const cross = new Cross();
  const val = ema.next(1);
  cross.over(val, 10);
  const state = { ema, cross };
  const json = JSON.stringify(state);
  const newState = parse(json);
  expect(newState).toStrictEqual(state);
});
