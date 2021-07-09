import EMA from "../EMA";
import type { EMAArgs } from "../EMA";
import type { JSONDef } from "../types";

export default class MACD {
  fast: EMA;
  slow: EMA;
  current: number | null;
  index: number;
  constructor(
    fast: number | EMA = 12,
    slow: number | EMA = 26,
    index = 0,
    current: number | null = null
  ) {
    this.fast = typeof fast === "number" ? new EMA(fast) : fast;
    this.slow = typeof slow === "number" ? new EMA(slow) : slow;
    this.index = index;
    this.current = current;
  }
  next(value: number): number | null {
    this.slow.next(value);
    if (this.index >= this.slow.period - this.fast.period) {
      this.fast.next(value);
    }
    if (this.index < this.slow.period - 1) {
      this.current = null;
    } else {
      this.current = this.fast.current - this.slow.current;
    }
    this.index++;
    return this.current;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.MACD",
      fast: this.fast,
      slow: this.slow,
      index: this.index,
      current: this.current,
    };
  }
  static from({
    fast,
    slow,
    index,
    current,
  }: {
    fast: EMAArgs;
    slow: EMAArgs;
    index: number;
    current: number;
  }): MACD {
    return new MACD(EMA.from(fast), EMA.from(slow), index, current);
  }
}
