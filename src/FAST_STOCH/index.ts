import MIN, { MINArgs } from "../MIN";
import MAX, { MAXArgs } from "../MAX";
import type { JSONDef, Indicator, High, Low, Close } from "../types";

export interface FAST_STOCHArgs {
  period: number;
  min: MINArgs;
  max: MAXArgs;
}

export default class FAST_STOCH implements Indicator<FAST_STOCHArgs> {
  period: number;
  min: MIN;
  max: MAX;
  constructor(period = 14, min = new MIN(period), max = new MAX(period)) {
    this.period = period;
    this.min = min;
    this.max = max;
  }
  next(value: number): number {
    const max = this.max.next(value);
    const min = this.min.next(value);
    if (min === max) return 50;
    return ((value - min) / (max - min)) * 100;
  }
  nextBar(bar: High & Low & Close): number {
    const max = this.max.next(bar.high);
    const min = this.min.next(bar.low);
    if (min === max) return 50;
    return ((bar.close - min) / (max - min)) * 100;
  }
  reset(): void {
    this.min.reset();
    this.max.reset();
  }
  toString(): string {
    return `FAST_STOCH(${this.period})`;
  }
  toJSON(): JSONDef<FAST_STOCHArgs> {
    return {
      $type: FAST_STOCH.key,
      period: this.period,
      min: this.min.toJSON(),
      max: this.max.toJSON(),
    };
  }
  static readonly key = "finance.tr.FAST_STOCH";
  static display({ period }: FAST_STOCHArgs): string {
    return `FAST_STOCH(${period})`;
  }
  static from({ period, min, max }: FAST_STOCHArgs): FAST_STOCH {
    return new FAST_STOCH(period, MIN.from(min), MAX.from(max));
  }
}
