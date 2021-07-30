import Window, { WindowArgs } from "../Window";
import type { JSONDef, Indicator, Close } from "../types";

export interface MADArgs {
  period: number;
  sum: number;
  count: number;
  window: WindowArgs<number>;
}

export default class MAD implements Indicator<MADArgs> {
  period: number;
  sum: number;
  count: number;
  window: Window<number>;
  constructor(period = 9, sum = 0, count = 0, window = new Window(period)) {
    this.period = period;
    this.sum = sum;
    this.count = count;
    this.window = window;
    if (this.window.needsInit) {
      this.window.init(0);
    }
  }
  next(value: number): number {
    const prev = this.window.push(value);
    if (this.count < this.period) {
      this.count += 1;
      this.sum += value;
    } else {
      this.sum += value - prev;
    }

    const mean = this.sum / this.count;

    const mad = this.window.back(this.count).reduce((memo, value) => {
      return memo + Math.abs(value - mean);
    }, 0);

    return mad / this.count;
  }
  nextBar(bar: Close): number {
    return this.next(bar.close);
  }
  toString(): string {
    return `MAD(${this.period})`;
  }
  toJSON(): JSONDef<MADArgs> {
    return {
      $type: MAD.key,
      period: this.period,
      sum: this.sum,
      count: this.count,
      window: this.window.toJSON(),
    };
  }
  static key = "finance.tr.MAD";
  static display({ period }: MADArgs, value: string = 'CLOSE'): string {
    return `MAD(${period}, ${value})`;
  }
  static from({ period, sum, count, window }: MADArgs): MAD {
    return new MAD(period, sum, count, Window.from(window));
  }
}
