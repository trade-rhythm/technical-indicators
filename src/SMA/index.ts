import Window from "../Window";
import type { WindowArgs } from "../Window";
import type { JSONDef, Indicator, Close } from "../types";

export interface SMAArgs {
  period: number;
  window: WindowArgs<number>;
  sum: number;
  count: number;
}

export default class SMA implements Indicator<SMAArgs> {
  period: number;
  window: Window<number>;
  sum: number;
  count: number;
  constructor(
    period: number,
    window: Window<number> = new Window(period),
    sum = 0,
    count = 0
  ) {
    this.period = period;
    this.window = window;
    this.sum = sum;
    this.count = count;
    if (this.window.needsInit) {
      this.window.init(0);
    }
  }
  toString(): string {
    return `SMA(${this.period})`;
  }
  next(value: number): number {
    const prev = this.window.push(value);
    if (this.count < this.period) {
      this.count += 1;
    }
    this.sum = this.sum - prev + value;
    return this.sum / this.count;
  }
  nextBar(bar: Close): number {
    return this.next(bar.close);
  }
  reset(): void {
    this.sum = 0;
    this.count = 0;
    this.window.init(0);
  }
  toJSON(): JSONDef<SMAArgs> {
    return {
      $type: SMA.key,
      period: this.period,
      window: this.window.toJSON(),
      sum: this.sum,
      count: this.count,
    };
  }
  static readonly key = "finance.tr.SMA";
  static display({ period }: SMAArgs, value: string = "CLOSE"): string {
    return `SMA(${period}, ${value})`;
  }
  static from({ period, window, sum, count }: SMAArgs): SMA {
    return new SMA(period, Window.from(window), sum, count);
  }
}
