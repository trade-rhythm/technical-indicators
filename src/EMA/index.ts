import type { JSONDef } from "../types";

export interface EMAArgs {
  period: number;
  k: number;
  current: number;
  index: number;
}

export default class EMA {
  period: number;
  k: number;
  current: number;
  index: number;
  constructor(
    period: number,
    k: number = 2 / (period + 1),
    current = 0.0,
    index = 0
  ) {
    this.period = period;
    this.k = k;
    this.current = current;
    this.index = index;
  }
  next(value: number): number {
    this.index++;
    if (this.index < this.period) {
      this.current += value;
      return this.current / this.index;
    } else if (this.index === this.period) {
      this.current = (this.current + value) / this.period;
    } else {
      this.current = (value - this.current) * this.k + this.current;
    }
    return this.current;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.EMA",
      period: this.period,
      k: this.k,
      current: this.current,
      index: this.index,
    };
  }
  static from({ period, k, current, index }: EMAArgs): EMA {
    return new EMA(period, k, current, index);
  }
}
