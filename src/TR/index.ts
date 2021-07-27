import type { JSONDef, Indicator, Bar } from "../types";

export interface TRArgs {
  prev: number;
}

export default class TR implements Indicator<TRArgs> {
  prev: number | null;
  constructor(prev: number | null = null) {
    this.prev = typeof prev === "number" ? prev : null;
  }
  display(value: string): string {
    return `TR(${value})`;
  }
  next(value: number): number | null {
    const prevPrev = this.prev;
    this.prev = value;
    if (prevPrev !== null) {
      return Math.abs(value - prevPrev);
    }
    return 0;
  }
  nextBar(bar: Bar): number {
    const prevPrev = this.prev;
    this.prev = bar.close;
    if (prevPrev === null) {
      return bar.high - bar.low;
    } else {
      const dist1 = bar.high - bar.low;
      const dist2 = Math.abs(bar.high - prevPrev);
      const dist3 = Math.abs(bar.low - prevPrev);
      return Math.max(dist1, dist2, dist3);
    }
  }
  toJSON(): JSONDef<TRArgs> {
    return { $type: TR.key, prev: this.prev };
  }
  static key = "finance.tr.TR";
  static from({ prev }: TRArgs): TR {
    return new TR(prev);
  }
}
