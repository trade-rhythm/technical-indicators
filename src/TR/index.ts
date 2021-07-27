import type { JSONDef, Indicator } from "../types";

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
      return Math.abs(this.prev - prevPrev);
    }
    return 0;
  }
  toJSON(): JSONDef<TRArgs> {
    return { $type: "finance.tr.TR", prev: this.prev };
  }
  static from({ prev }: TRArgs): TR {
    return new TR(prev);
  }
}
