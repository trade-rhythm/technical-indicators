import { JSONDef, Indicator, Close } from "../types";

export interface EMAArgs {
  period: number;
  k: number;
  current: number;
}

export default class EMA extends Indicator<EMAArgs> {
  period: number;
  k: number;
  current: number | null;
  constructor(
    period: number,
    k: number = 2 / (period + 1),
    current: number | null = null
  ) {
    super();
    this.period = period;
    this.k = k;
    this.current = current;
  }
  toString(): string {
    return `EMA(${this.period})`;
  }
  next(value: number): number {
    if (this.current === null) {
      this.current = value;
    } else {
      this.current = this.k * value + (1 - this.k) * this.current;
    }
    return this.current;
  }
  nextBar(bar: Close): number {
    return this.next(bar.c);
  }
  reset(): void {
    return (this.current = null);
  }
  toJSON(): JSONDef<EMAArgs> {
    return {
      $type: EMA.key,
      period: this.period,
      k: this.k,
      current: this.current,
    };
  }
  static readonly key = "finance.tr.EMA";
  static minBars({ period }: EMAArgs): number {
    return period;
  }
  static display({ period }: EMAArgs, value = "CLOSE"): string {
    return `EMA(${period}, ${value})`;
  }
  static from({ period, k, current }: EMAArgs): EMA {
    return new EMA(period, k, current);
  }
}
