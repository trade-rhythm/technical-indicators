import SMA, { SMAArgs } from "../SMA";
import { JSONDef, Indicator, High, Low } from "../types";
import { NextNotImplemented } from "../utils";

export interface AOArgs {
  fast: SMAArgs;
  slow: SMAArgs;
}

export default class AO extends Indicator<AOArgs> {
  fast: SMA;
  slow: SMA;
  constructor(fast: number | SMA = 5, slow: number | SMA = 34) {
    super();
    this.fast = typeof fast === "number" ? new SMA(fast) : fast;
    this.slow = typeof slow === "number" ? new SMA(slow) : slow;
  }
  next(): number {
    throw new NextNotImplemented("AO");
  }
  nextBar(bar: High & Low): number {
    const median = (bar.h + bar.l) / 2;
    return this.fast.next(median) - this.slow.next(median);
  }
  reset(): void {
    this.fast.reset();
    this.slow.reset();
  }
  toString(): string {
    return `AO()`;
  }
  toJSON(): JSONDef<AOArgs> {
    return {
      $type: AO.key,
      fast: this.fast.toJSON(),
      slow: this.slow.toJSON(),
    };
  }
  static display(): string {
    return `AO()`;
  }
  static minBars({ fast, slow }: AOArgs): number {
    return Math.max(SMA.minBars(fast), SMA.minBars(slow));
  }
  static readonly key = "finance.tr.AO";
  static from({ fast, slow }: AOArgs): AO {
    return new AO(SMA.from(fast), SMA.from(slow));
  }
}
