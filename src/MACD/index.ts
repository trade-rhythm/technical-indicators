import EMA from "../EMA";
import type { EMAArgs } from "../EMA";
import { JSONDef, Indicator, Close } from "../types";

export interface MACDArgs {
  fast: EMAArgs;
  slow: EMAArgs;
  signal: EMAArgs;
}

export interface MACDOutput {
  macd: number;
  signal: number;
  histogram: number;
}

export default class MACD extends Indicator<MACDArgs, MACDOutput> {
  fast: EMA;
  slow: EMA;
  signal: EMA;
  constructor(
    fast: number | EMA = 12,
    slow: number | EMA = 26,
    signal: number | EMA = 9
  ) {
    super();
    this.fast = typeof fast === "number" ? new EMA(fast) : fast;
    this.slow = typeof slow === "number" ? new EMA(slow) : slow;
    this.signal = typeof signal === "number" ? new EMA(signal) : signal;
  }
  toString(): string {
    return `MACD(${this.fast.period}, ${this.slow.period}, ${this.signal.period})`;
  }
  next(value: number): MACDOutput {
    const fast = this.fast.next(value);
    const slow = this.slow.next(value);

    const macd = fast - slow;
    const signal = this.signal.next(macd);
    const histogram = macd - signal;

    return {
      macd,
      signal,
      histogram,
    };
  }
  nextBar(bar: Close): MACDOutput {
    return this.next(bar.c);
  }
  reset(): void {
    this.fast.reset();
    this.slow.reset();
    this.signal.reset();
  }
  toJSON(): JSONDef<MACDArgs> {
    return {
      $type: MACD.key,
      fast: this.fast,
      slow: this.slow,
      signal: this.signal,
    };
  }
  static readonly key = "finance.tr.MACD";
  static minBars({ fast, slow, signal }: MACDArgs): number {
    return Math.max(EMA.minBars(fast), EMA.minBars(slow), EMA.minBars(signal))
  }
  static display(
    { fast, slow, signal }: MACDArgs,
    value = "CLOSE"
  ): string {
    return `MACD(${fast.period}, ${slow.period}, ${signal.period}, ${value})`;
  }
  static from({ fast, slow, signal }: MACDArgs): MACD {
    return new MACD(EMA.from(fast), EMA.from(slow), EMA.from(signal));
  }
}
