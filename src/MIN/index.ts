import type { JSONDef, Indicator, Low } from "../types";

export interface MINArgs {
  period: number;
  minIdx: number;
  curIdx: number;
  queue: number[];
}

export default class MIN implements Indicator<MINArgs> {
  period: number;
  minIdx: number;
  curIdx: number;
  queue: number[];
  constructor(
    period = 14,
    minIdx = 0,
    curIdx = 0,
    queue = new Array(period).fill(Number.POSITIVE_INFINITY)
  ) {
    this.period = period;
    this.minIdx = minIdx;
    this.curIdx = curIdx;
    this.queue = queue;
  }
  next(value: number): number {
    this.queue[this.curIdx] = value;

    if (value < this.queue[this.minIdx]) {
      this.minIdx = this.curIdx;
    } else if (this.minIdx === this.curIdx) {
      this.minIdx = this.findMinIdx();
    }

    this.curIdx = this.curIdx + 1 < this.period ? this.curIdx + 1 : 0;
    return this.queue[this.minIdx];
  }
  nextBar(bar: Low): number {
    return this.next(bar.low);
  }
  findMinIdx(): number {
    let min = Number.POSITIVE_INFINITY;
    let index = 0;
    this.queue.forEach((value, idx) => {
      if (value < min) {
        min = value;
        index = idx;
      }
    });
    return index;
  }
  toString(): string {
    return `MIN(${this.period})`;
  }
  toJSON(): JSONDef<MINArgs> {
    return {
      $type: MIN.key,
      period: this.period,
      minIdx: this.minIdx,
      curIdx: this.curIdx,
      queue: this.queue
    };
  }
  static key = "finance.tr.MIN";
  static display({ period }: MINArgs, value: string = "LOW"): string {
    return `MIN(${period}, ${value})`;
  }
  static from({ period, minIdx, curIdx, queue }: MINArgs): MIN {
    return new MIN(
      period,
      minIdx,
      curIdx,
      queue.map(v => v ?? Number.POSITIVE_INFINITY)
    );
  }
}
