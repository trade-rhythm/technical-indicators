export const calcE = (a: number, b: number) =>
  2 * Number.EPSILON * Math.max(Math.abs(a), Math.abs(b), 1);

// Less than
export const lt = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return a - b < E && Math.abs(a - b) > E;
};

// Greater than
export const gt = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return a - b > E && Math.abs(a - b) > E;
};

// Equals
export const eq = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return Math.abs(a - b) < E;
};

// Not equals
export const neq = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return !eq(a, b, E);
};

// Less than or equal
export const lte = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return eq(a, b, E) || lt(a, b, E);
};

// Greater than or equal
export const gte = (a: number, b: number, E: number = calcE(a, b)): boolean => {
  return eq(a, b, E) || gt(a, b, E);
};

export class NextNotImplemented extends Error {
  indicator: string;
  constructor(
    indicator: string,
    ...params: ConstructorParameters<typeof Error>
  ) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NextNotImplemented);
    }
    this.indicator = indicator;
    this.name = "NotImplemented";
  }
  get message(): string {
    return `"next" method is not implemented on "${this.indicator}". Please try "nextBar" instead"`;
  }
}
