import TR, { TRArgs } from "../TR";
import { JSONDef, Indicator, High, Low, Close } from "../types";
import { NextNotImplemented } from "../utils";

export interface DMIArgs {
  period: number;
  tr: TRArgs;
  k: number;
  index: number;
  atrSum: number;
  upSum: number;
  downSum: number;
  prevBar?: High & Low & Close;
}

export default class DMI extends Indicator<DMIArgs> {
  period: number;
  tr: TR;
  k: number;
  index: number;
  atrSum: number;
  upSum: number;
  downSum: number;
  prevBar?: High & Low & Close;
  constructor(
    period = 5,
    tr = new TR(),
    k = (period - 1) / period,
    index = 0,
    atrSum = 0,
    upSum = 0,
    downSum = 0,
    prevBar: High & Low & Close = null
  ) {
    super();
    this.period = period;
    this.tr = tr;
    this.k = k;
    this.index = index;
    this.atrSum = atrSum;
    this.upSum = upSum;
    this.downSum = downSum;
    this.prevBar = prevBar;
  }
  next(): number {
    throw new NextNotImplemented("DMI");
  }
  nextBar(bar: High & Low & Close): number | null {
    this.index += 1;
    if (!this.prevBar) {
      this.prevBar = bar;
      this.atrSum += this.tr.nextBar(bar);
      return null;
    }
    if (this.index < this.period) {
      this.atrSum += this.tr.nextBar(bar);
      const [up, down] = this.getDirection(bar);
      this.upSum += up;
      this.downSum += down;
      this.prevBar = bar;
      return null;
    } else {
      const tr = this.tr.nextBar(bar);
      this.atrSum = this.atrSum * this.k + tr;
      const [up, down] = this.getDirection(bar);
      this.upSum = this.upSum * this.k + up;
      this.downSum = this.downSum * this.k + down;

      const upNorm = 100 * (this.upSum / this.atrSum);
      const downNorm = 100 * (this.downSum / this.atrSum);
      const diffNorm = Math.abs(upNorm - downNorm);
      const sumNorm = upNorm + downNorm;
      this.prevBar = bar;
      return (diffNorm / sumNorm) * 100;
    }
  }
  getDirection(bar: High & Low & Close): [number, number] {
    let up = bar.h - this.prevBar.h;
    let down = this.prevBar.l - bar.l;
    if (up < 0 || up < down) {
      up = 0;
    }
    if (down < 0 || down < up) {
      down = 0;
    }
    return [up, down];
  }
  reset(): void {
    this.tr.reset();
    this.index = 0;
    this.atrSum = 0;
    this.upSum = 0;
    this.downSum = 0;
    this.prevBar = null;
  }
  display(value: string): string {
    return `DMI(${value})`;
  }
  toString(): string {
    return `DMI(${this.period})`;
  }
  toJSON(): JSONDef<DMIArgs> {
    return {
      $type: DMI.key,
      period: this.period,
      tr: this.tr,
      k: this.k,
      index: this.index,
      atrSum: this.atrSum,
      upSum: this.upSum,
      downSum: this.downSum,
      prevBar: this.prevBar,
    };
  }
  static readonly key = "finance.tr.DMI";
  static minBars({ period }: DMIArgs): number {
    return period;
  }
  static display({ period }: DMIArgs): string {
    return `TR(${period})`;
  }
  static from({
    period,
    tr,
    index,
    k,
    atrSum,
    upSum,
    downSum,
    prevBar,
  }: DMIArgs): DMI {
    return new DMI(
      period,
      TR.from(tr),
      k,
      index,
      atrSum,
      upSum,
      downSum,
      prevBar
    );
  }
}
