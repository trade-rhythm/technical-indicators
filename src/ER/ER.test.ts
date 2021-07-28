import ER from "./index";

test("ER calculates correctly", () => { 
  const er = new ER(3);
  [ 
    [3, 1],
    [5, 1],
    [2, 0.2],
    [3, 0],
    [1, 0.667],
    [3, 0.2],
    [4, 0.2],
    [6, 1],
  ].forEach(([val, result]) => { 
    expect(+er.next(val).toFixed(3)).toBe(result);
  });
}); 

test("ER serializes/deserializes correctly", () => { 
  const er = new ER();
  er.next(1); 
  const json = JSON.stringify(er);
  const newER = ER.from(JSON.parse(json));
  expect(newER).toEqual(er);
});
