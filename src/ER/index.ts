import Window, { WindowArgs } from "../Window";
import { JSONDef, Indicator, Close } from "../types";

export interface ERArgs {
  period: number;
  count: number;
  window: WindowArgs<number>;
}

export default class ER extends Indicator<ERArgs> {
  period: number;
  count: number;
  window: Window<number>;
  constructor(period = 14, count = 0, window = new Window(period)) {
    super();
    this.period = period;
    this.count = count;
    this.window = window;
    if (this.window.needsInit) {
      this.window.init(0);
    }
  }
  next(value: number): number {
    let oldest = this.window.push(value);
    if (this.count === 0) {
      this.count += 1;
    } else if (this.count < this.period) {
      this.count += 1;
      oldest = this.window.get(-this.count);
    }
    let volatility = 0;
    let prev = oldest;
    this.window.back(this.count).forEach((value) => {
      volatility += Math.abs(prev - value);
      prev = value;
    });
    return Math.abs(oldest - value) / volatility;
  }
  nextBar(bar: Close): number {
    return this.next(bar.c);
  }
  reset(): void {
    this.count = 0;
    this.window.init(0);
  }
  toString(): string {
    return `ER(${this.period})`;
  }
  toJSON(): JSONDef<ERArgs> {
    return {
      $type: ER.key,
      period: this.period,
      count: this.count,
      window: this.window.toJSON(),
    };
  }
  static readonly key = "finance.tr.ER";
  static minBars({ period }: ERArgs): number {
    return period;
  }
  static display({ period }: ERArgs, value = "CLOSE"): string {
    return `ER(${period}, ${value})`;
  }
  static from({ period, count, window }: ERArgs): ER {
    return new ER(period, count, Window.from(window));
  }
}
