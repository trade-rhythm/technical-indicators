import { lt } from "../utils";
import Window, { WindowArgs } from "../Window";
import type { JSONDef, Indicator, Close } from "../types";

export interface SDArgs {
  period: number;
  count: number;
  m: number;
  m2: number;
  window: WindowArgs<number>;
}

export default class SD implements Indicator<SDArgs> {
  period: number;
  count: number;
  m: number;
  m2: number;
  window: Window<number>;
  constructor(
    period = 9,
    count = 0,
    m = 0,
    m2 = 0,
    window = new Window(period)
  ) {
    this.period = period;
    this.count = count;
    this.m = m;
    this.m2 = m2;
    this.window = window;
    if (this.window.needsInit) {
      this.window.init(0);
    }
  }
  toString(): string {
    return `SD(${this.period})`;
  }
  next(value: number): number {
    const prev = this.window.push(value);
    if (this.count < this.period) {
      this.count += 1;

      const delta = value - this.m;
      this.m += delta / this.count;

      const delta2 = value - this.m;
      this.m2 += delta * delta2;
    } else {
      const delta = value - prev;
      const prevM = this.m;
      this.m += delta / this.period;
      const delta2 = value - this.m + prev - prevM;
      this.m2 += delta * delta2;
    }

    if (lt(this.m2, 0)) {
      this.m2 = 0;
    }

    return Math.sqrt(this.m2 / this.count);
  }
  nextBar(bar: Close): number {
    return this.next(bar.c);
  }
  reset(): void {
    this.count = 0;
    this.m = 0;
    this.m2 = 0;
    this.window.init(0);
  }
  toJSON(): JSONDef<SDArgs> {
    return {
      $type: SD.key,
      period: this.period,
      count: this.count,
      m: this.m,
      m2: this.m2,
      window: this.window.toJSON(),
    };
  }
  static readonly key = "finance.tr.SD";
  static display({ period }: SDArgs, value = "CLOSE"): string {
    return `SD(${period}, ${value})`;
  }
  static from({ period, count, m, m2, window }: SDArgs): SD {
    return new SD(period, count, m, m2, Window.from(window));
  }
}
