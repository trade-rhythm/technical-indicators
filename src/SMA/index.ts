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
  display(value: string): string {
    return `SMA(${this.period}, ${value})`;
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
  toJSON(): JSONDef<SMAArgs> {
    return {
      $type: SMA.key,
      period: this.period,
      window: this.window.toJSON(),
      sum: this.sum,
      count: this.count
    };
  }
  static key = "finance.tr.SMA";
  static from({ period, window, sum, count }: SMAArgs): SMA {
    return new SMA(period, Window.from(window), sum, count);
  }
}
