import type { JSONDef, Indicator, Bar } from "../types";

export interface MAXArgs {
  period: number;
  maxIdx: number;
  curIdx: number;
  queue: number[];
}

export default class MAX implements Indicator<MAXArgs> {
  period: number;
  maxIdx: number;
  curIdx: number;
  queue: number[];
  constructor(
    period = 14,
    maxIdx = 0,
    curIdx = 0,
    queue = new Array(period).fill(Number.NEGATIVE_INFINITY)
  ) {
    this.period = period;
    this.maxIdx = maxIdx;
    this.curIdx = curIdx;
    this.queue = queue;
  }
  next(value: number): number {
    this.queue[this.curIdx] = value;

    if (value > this.queue[this.maxIdx]) {
      this.maxIdx = this.curIdx;
    } else if (this.maxIdx === this.curIdx) {
      this.maxIdx = this.findMaxIdx();
    }

    this.curIdx = this.curIdx + 1 < this.period ? this.curIdx + 1 : 0;
    return this.queue[this.maxIdx];
  }
  nextBar(bar: Bar): number {
    return this.next(bar.high);
  }
  findMaxIdx(): number {
    let max = Number.NEGATIVE_INFINITY;
    let index = 0;
    this.queue.forEach((value, idx) => {
      if (value > max) {
        max = value;
        index = idx;
      }
    });
    return index;
  }
  display(value: string): string {
    return `MAX(${this.period}, ${value})`;
  }
  toJSON(): JSONDef<MAXArgs> {
    return {
      $type: MAX.key,
      period: this.period,
      maxIdx: this.maxIdx,
      curIdx: this.curIdx,
      queue: this.queue
    };
  }
  static key = "finance.tr.MAX";
  static from({ period, maxIdx, curIdx, queue }: MAXArgs): MAX {
    return new MAX(period, maxIdx, curIdx, queue);
  }
}
