import Window from "../Window";
import type { WindowArgs } from "../Window";
import { JSONDef, Indicator } from "../types";

export default class SMA extends Indicator {
  period: number;
  window: Window<number>;
  current: number;
  isNew: boolean;
  constructor(
    period: number,
    window: Window<number> = new Window(period),
    current = 0.0,
    isNew = true
  ) {
    super();
    this.period = period;
    this.window = window;
    this.current = current;
    this.isNew = isNew;
  }
  next(value: number): number {
    if (this.isNew) {
      this.isNew = false;
      this.current = value;
      this.window.init(value);
    } else {
      const prev = this.window.push(value);
      this.current += (value - prev) / this.period;
    }
    return this.current;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.MA",
      ...this,
    };
  }
  static from({
    period,
    window,
    current,
    isNew,
  }: {
    period: number;
    window: WindowArgs<number>;
    current: number;
    isNew: boolean;
  }): SMA {
    return new SMA(period, Window.from(window), current, isNew);
  }
}
