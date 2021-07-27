import Window from "../Window";
import type { WindowArgs } from "../Window";
import type { JSONDef, Indicator } from "../types";

export interface SMAArgs {
  period: number;
  window: WindowArgs<number>;
  current: number;
}

export default class SMA implements Indicator<SMAArgs> {
  period: number;
  window: Window<number>;
  current: number;
  constructor(
    period: number,
    window: Window<number> = new Window(period),
    current = 0.0
  ) {
    this.period = period;
    this.window = window;
    this.current = current;
  }
  display(value: string): string {
    return `SMA(${this.period}, ${value})`;
  }
  next(value: number): number {
    if (this.window.needsInit) {
      this.current = value;
      this.window.init(value);
    } else {
      const prev = this.window.push(value);
      this.current += (value - prev) / this.period;
    }
    return this.current;
  }
  toJSON(): JSONDef<SMAArgs> {
    return {
      $type: "finance.tr.MA",
      period: this.period,
      window: this.window.toJSON(),
      current: this.current,
    };
  }
  static from({ period, window, current }: SMAArgs): SMA {
    return new SMA(period, Window.from(window), current);
  }
}
