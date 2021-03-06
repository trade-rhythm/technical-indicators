import { JSONDef, Indicator, High, Low, Close } from "../types";

export interface TRArgs {
  prev: number;
}

export default class TR extends Indicator<TRArgs> {
  prev: number | null;
  constructor(prev: number | null = null) {
    super();
    this.prev = typeof prev === "number" ? prev : null;
  }
  next(value: number): number | null {
    const prevPrev = this.prev;
    this.prev = value;
    if (prevPrev !== null) {
      return Math.abs(value - prevPrev);
    }
    return 0;
  }
  nextBar(bar: High & Low & Close): number {
    const prevPrev = this.prev;
    this.prev = bar.c;
    if (prevPrev === null) {
      return bar.h - bar.l;
    } else {
      const dist1 = bar.h - bar.l;
      const dist2 = Math.abs(bar.h - prevPrev);
      const dist3 = Math.abs(bar.l - prevPrev);
      return Math.max(dist1, dist2, dist3);
    }
  }
  reset(): void {
    this.prev = null;
  }
  toString(): string {
    return `TR()`;
  }
  toJSON(): JSONDef<TRArgs> {
    return { $type: TR.key, prev: this.prev };
  }
  static readonly key = "finance.tr.TR";
  static minBars(): number {
    return 0;
  }
  static display(): string {
    return `TR()`;
  }
  static from({ prev }: TRArgs): TR {
    return new TR(prev);
  }
}
