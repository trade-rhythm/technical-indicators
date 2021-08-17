import Window, { WindowArgs } from "../Window";
import DMI, { DMIArgs } from "../DMI";
import type { JSONDef, Indicator, High, Low, Close } from "../types";
import { NextNotImplemented } from "../utils";

export interface ADXArgs {
  period: number;
  dmi: DMIArgs;
  sum: number;
  window: WindowArgs<number>;
  prev: number;
  count: number;
}

export default class ADX implements Indicator<ADXArgs> {
  period: number;
  dmi: DMI;
  sum: number;
  window: Window<number>;
  prev?: number;
  count: number;
  constructor(
    period = 14,
    dmi = new DMI(period),
    sum = 0,
    window = new Window(period),
    prev: number | null = null,
    count = 0
  ) {
    this.period = period;
    this.dmi = dmi;
    this.sum = sum;
    this.window = window;
    this.prev = prev;
    this.count = count;
  }
  next(): number {
    throw new NextNotImplemented("ADX");
  }
  nextBar(bar: High & Low & Close): number | null {
    this.count += 1;
    const dmi = this.dmi.nextBar(bar);
    if (dmi) {
      this.sum += dmi;
      this.window.push(dmi);
    }
    if (this.count < this.period * 2 - 1) {
      return null;
    } else if (this.prev === null) {
      this.prev = this.sum / this.period;
    } else {
      this.prev = (this.prev * (this.period - 1) + dmi) / this.period;
    }
    return this.prev;
  }
  reset(): void {
    this.dmi.reset();
    this.sum = 0;
    this.window = new Window(this.period);
    this.prev = null;
    this.count = 0;
  }
  toString(): string {
    return `ADX(${this.period})`;
  }
  toJSON(): JSONDef<ADXArgs> {
    return {
      $type: ADX.key,
      period: this.period,
      dmi: this.dmi,
      sum: this.sum,
      window: this.window.toJSON(),
      prev: this.prev,
      count: this.count,
    };
  }
  static display({ period }: ADXArgs): string {
    return `ADX(${period})`;
  }
  static readonly key = "finance.tr.ADX";
  static from({ period, dmi, sum, window, prev, count }: ADXArgs): ADX {
    return new ADX(
      period,
      DMI.from(dmi),
      sum,
      Window.from(window),
      prev,
      count
    );
  }
}
