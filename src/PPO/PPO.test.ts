import PPO, { PPOOut } from "./index";

const round = (v: PPOOut): PPOOut => ({
  ppo: +v.ppo.toFixed(2),
  signal: +v.signal.toFixed(2),
  hisogram: +v.histogram.toFixed(2),
});

test("PPO calculates correctly", () => {
  const ppo = new PPO(3, 6, 4);
  [
    // value, ppo, signal, hisogram
    [2, 0, 0, 0],
    [3, 9.38, 3.75, 5.63],
    [4.2, 18.26, 9.56, 8.71],
    [7, 28.62, 17.18, 11.44],
    [6.7, 24.01, 19.91, 4.09],
    [6.5, 17.84, 19.08, -1.24],
  ].forEach(([val, ppoVal, signal, hisogram]) => {
    expect(round(ppo.next(val))).toStrictEqual({
      ppo: ppoVal,
      signal,
      hisogram,
    });
  });
});

test("PPO serializes/deserializes correctly", () => {
  const ppo = new PPO();
  ppo.next(1);
  const json = JSON.stringify(ppo);
  const newPPO = PPO.from(JSON.parse(json));
  expect(newPPO).toEqual(ppo);
});
