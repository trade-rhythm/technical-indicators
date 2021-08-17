import FAST_STOCH, { FAST_STOCHArgs } from "../FAST_STOCH";
import EMA, { EMAArgs } from "../EMA";
import type { JSONDef, Indicator, High, Low, Close } from "../types";

export interface SLOW_STOCHArgs {
  fast: FAST_STOCHArgs;
  ema: EMAArgs;
}

export default class SLOW_STOCH implements Indicator<SLOW_STOCHArgs> {
  ema: EMA;
  fast: FAST_STOCH;
  constructor(fast: number | FAST_STOCH = 14, ema: number | EMA = 3) {
    this.fast = typeof fast === "number" ? new FAST_STOCH(fast) : fast;
    this.ema = typeof ema === "number" ? new EMA(ema) : ema;
  }
  next(value: number): number {
    return this.ema.next(this.fast.next(value));
  }
  nextBar(bar: High & Low & Close): number {
    return this.ema.next(this.fast.nextBar(bar));
  }
  reset(): void {
    this.fast.reset();
    this.ema.reset();
  }
  toString(): string {
    return `SLOW_STOCH(${this.fast.period}, ${this.ema.period})`;
  }
  toJSON(): JSONDef<SLOW_STOCHArgs> {
    return {
      $type: SLOW_STOCH.key,
      fast: this.fast.toJSON(),
      ema: this.ema.toJSON(),
    };
  }
  static readonly key = "finance.tr.SLOW_STOCH";
  static display({ fast, ema }: SLOW_STOCHArgs): string {
    return `SLOW_STOCH(${fast.period}, ${ema.period})`;
  }
  static from({ fast, ema }: SLOW_STOCHArgs): SLOW_STOCH {
    return new SLOW_STOCH(FAST_STOCH.from(fast), EMA.from(ema));
  }
}
