import Window from "../Window";
import { lt } from "../utils";
import type { WindowArgs } from "../Window";
import { JSONDef, Indicator, Close } from "../types";

export interface RSIArgs {
  period: number;
  index: number;
  window: WindowArgs<number>;
}

export default class RSI extends Indicator<RSIArgs> {
  period: number;
  index: number;
  window: Window;
  constructor(period: number, index = 0, window = new Window(period + 1)) {
    super();
    this.period = period;
    this.index = index;
    this.window = window;
  }
  toString(): string {
    return `RSI(${this.period})`;
  }
  next(value: number): number | null {
    this.index++;
    let loss = 0,
      gain = 0;
    if (this.index <= this.period) {
      this.window.push(value);
      return null;
    } else {
      this.window.push(value);
      for (let q = 1; q < this.window.size; q++) {
        const v = this.window.get(q) - this.window.get(q - 1);
        if (lt(v, 0)) {
          loss += Math.abs(v);
        } else {
          gain += v;
        }
      }
    }
    return 100 - 100 / (1 + gain / this.period / (loss / this.period));
  }
  nextBar(bar: Close): number {
    return this.next(bar.c);
  }
  reset(): void {
    this.index = 0;
    this.window = new Window(this.period + 1);
  }
  toJSON(): JSONDef<RSIArgs> {
    return {
      $type: RSI.key,
      period: this.period,
      index: this.index,
      window: this.window.toJSON(),
    };
  }
  static readonly key = "finance.tr.RSI";
  static minBars({ period }: RSIArgs): number {
    return period;
  }
  static display({ period }: RSIArgs, value = "CLOSE"): string {
    return `RSI(${period}, ${value})`;
  }
  static from({ period, index, window }: RSIArgs): RSI {
    return new RSI(period, index, Window.from(window));
  }
}
