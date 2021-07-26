import Window from "../Window";
import type { WindowArgs } from "../Window";
import { JSONDef, Indicator } from "../types";

export default class RSI extends Indicator {
  period: number;
  index: number;
  window: Window;
  constructor(period: number, index = 0, window = new Window(period + 1)) {
    super();
    this.period = period;
    this.index = index;
    this.window = window;
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
        if (v < 0) {
          loss += Math.abs(v);
        } else {
          gain += v;
        }
      }
    }
    return 100 - 100 / (1 + gain / this.period / (loss / this.period));
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.RSI",
      ...this
    };
  }
  static from({
    period,
    index,
    window,
  }: {
    period: number;
    index: number;
    window: WindowArgs<number>;
  }): RSI {
    return new RSI(period, index, Window.from(window));
  }
}
