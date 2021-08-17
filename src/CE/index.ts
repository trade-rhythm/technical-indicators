import ATR, { ATRArgs } from "../ATR";
import MIN, { MINArgs } from "../MIN";
import MAX, { MAXArgs } from "../MAX";
import type { JSONDef, Indicator, High, Low, Close } from "../types";

export interface CEArgs {
  period: number;
  multiplier: number;
  atr: ATRArgs;
  min: MINArgs;
  max: MAXArgs;
}

export interface Chandelier {
  long: number;
  short: number;
}

export default class CE implements Indicator<CEArgs, Chandelier> {
  period: number;
  multiplier: number;
  atr: ATR;
  min: MIN;
  max: MAX;
  constructor(
    period = 22,
    multiplier = 3,
    atr = new ATR(period),
    min = new MIN(period),
    max = new MAX(period)
  ) {
    this.period = period;
    this.multiplier = multiplier;
    this.atr = atr;
    this.min = min;
    this.max = max;
  }
  next(value: number): Chandelier {
    const atr = this.atr.next(value) * this.multiplier;
    const min = this.min.next(value);
    const max = this.max.next(value);

    return {
      long: max - atr,
      short: min + atr,
    };
  }
  nextBar(bar: High & Low & Close): Chandelier {
    const atr = this.atr.nextBar(bar) * this.multiplier;
    const min = this.min.nextBar(bar);
    const max = this.max.nextBar(bar);

    return {
      long: max - atr,
      short: min + atr,
    };
  }
  reset(): void {
    this.atr.reset();
    this.min.reset();
    this.max.reset();
  }
  toString(): string {
    return `CE(${this.period}, ${this.multiplier})`;
  }
  toJSON(): JSONDef<CEArgs> {
    return {
      $type: CE.key,
      period: this.period,
      multiplier: this.multiplier,
      atr: this.atr.toJSON(),
      max: this.max.toJSON(),
      min: this.min.toJSON(),
    };
  }
  static readonly key = "finance.tr.CE";
  static display({ period, multiplier }: CEArgs): string {
    return `CE(${period}, ${multiplier})`;
  }
  static from({ period, multiplier, atr, min, max }: CEArgs): CE {
    return new CE(
      period,
      multiplier,
      ATR.from(atr),
      MIN.from(min),
      MAX.from(max)
    );
  }
}
