const calcE = (a, b) =>
  2 * Number.EPSILON * Math.max(Math.abs(a), Math.abs(b), 1);

const eq = (a, b, E = calcE(a, b)) => {
  return Math.abs(a - b) < E;
};

const jestExpect = global.expect;
jestExpect.extend({
  approx(received, value, e) {
    const pass = eq(received, value, e);
    if (pass) {
      return {
        message: () => `expected ${received} not to be within espilon range`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within espilon range but was off by ${
            value - received
          }`,
        pass: false,
      };
    }
  },
});
