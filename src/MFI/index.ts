import type { JSONDef, Indicator, High, Low, Close, Volume } from "../types";
import { NextNotImplemented } from "../utils";

export interface MFIArgs {
  period: number;
  index: number;
  count: number;
  prevPrice: number;
  totalPositive: number;
  totalNegative: number;
  queue: number[];
}

export default class MFI implements Indicator<MFIArgs> {
  period: number;
  index: number;
  count: number;
  prevPrice: number;
  totalPositive: number;
  totalNegative: number;
  queue: number[];
  constructor(
    period = 14,
    index = 0,
    count = 0,
    prevPrice = 0,
    totalPositive = 0,
    totalNegative = 0,
    queue = new Array(period).fill(0)
  ) {
    this.period = period;
    this.index = index;
    this.count = count;
    this.prevPrice = prevPrice;
    this.totalPositive = totalPositive;
    this.totalNegative = totalNegative;
    this.queue = queue;
  }
  next(): number {
    throw new NextNotImplemented("MFI");
  }
  nextBar(bar: High & Low & Close & Volume): number {
    const tp = (bar.high + bar.low + bar.close) / 3;

    this.index = this.index + 1 < this.period ? this.index + 1 : 0;

    if (this.count < this.period) {
      this.count += 1;
      if (this.count === 1) {
        this.prevPrice = tp;
        return 50;
      }
    } else {
      const popped = this.queue[this.index];
      if (popped >= 0) {
        this.totalPositive -= popped;
      } else {
        this.totalNegative += popped;
      }
    }

    const mf = tp * bar.volume;
    if (tp > this.prevPrice) {
      this.totalPositive += mf;
      this.queue[this.index] = mf;
    } else if (tp < this.prevPrice) {
      this.totalNegative += mf;
      this.queue[this.index] = -mf;
    } else {
      this.queue[this.index] = 0;
    }

    this.prevPrice = tp;

    return (
      (this.totalPositive / (this.totalPositive + this.totalNegative)) * 100
    );
  }
  reset(): void {
    this.index = 0;
    this.count = 0;
    this.prevPrice = 0;
    this.totalPositive = 0;
    this.totalNegative = 0;
    this.queue = new Array(this.period).fill(0);
  }
  toString(): string {
    return `MFI(${this.period})`;
  }
  toJSON(): JSONDef<MFIArgs> {
    return {
      $type: MFI.key,
      period: this.period,
      index: this.index,
      count: this.count,
      prevPrice: this.prevPrice,
      totalPositive: this.totalPositive,
      totalNegative: this.totalNegative,
      queue: this.queue,
    };
  }
  static readonly key = "finance.tr.MFI";
  static display({ period }: MFIArgs): string {
    return `MFI(${period})`;
  }
  static from({
    period,
    index,
    count,
    prevPrice,
    totalPositive,
    totalNegative,
    queue,
  }: MFIArgs): MFI {
    return new MFI(
      period,
      index,
      count,
      prevPrice,
      totalPositive,
      totalNegative,
      queue
    );
  }
}
