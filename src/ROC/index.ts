import Window, { WindowArgs } from "../Window";
import type { JSONDef, Indicator, Close } from "../types";

export interface ROCArgs {
  period: number;
  count: number;
  window: WindowArgs<number>;
}

export default class ROC implements Indicator<ROCArgs> {
  period: number;
  count: number;
  window: Window<number>;
  constructor(period = 9, count = 0, window = new Window(period)) {
    this.period = period;
    this.count = count;
    this.window = window;
    if (this.window.needsInit) {
      this.window.init(0);
    }
  }
  next(value: number): number {
    let oldest = this.window.push(value);
    if (this.count < this.period) {
      this.count += 1;
      if (this.count === 1) {
        oldest = value;
      } else {
        oldest = this.window.get(-this.count);
      }
    }
    return ((value - oldest) / oldest) * 100;
  }
  nextBar(bar: Close): number {
    return this.next(bar.c);
  }
  reset(): void {
    this.count = 0;
    this.window.init(0);
  }
  toString(): string {
    return `ROC(${this.period})`;
  }
  toJSON(): JSONDef<ROCArgs> {
    return {
      $type: ROC.key,
      period: this.period,
      count: this.count,
      window: this.window.toJSON(),
    };
  }
  static readonly key = "finance.tr.ROC";
  static display({ period }: ROCArgs, value = "CLOSE"): string {
    return `ROC(${period}, ${value})`;
  }
  static from({ period, count, window }: ROCArgs): ROC {
    return new ROC(period, count, Window.from(window));
  }
}
