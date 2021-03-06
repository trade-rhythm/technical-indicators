import SD, { SDArgs } from "../SD";
import { JSONDef, Indicator, Close } from "../types";

export interface BBArgs {
  period: number;
  multiplier: number;
  sd: SDArgs;
}

export interface Band {
  average: number;
  upper: number;
  lower: number;
}

export default class BB extends Indicator<BBArgs, Band> {
  period: number;
  multiplier: number;
  sd: SD;
  constructor(period = 9, multiplier = 2, sd = new SD(period)) {
    super();
    this.period = period;
    this.multiplier = multiplier;
    this.sd = sd;
  }
  next(value: number): Band {
    const sd = this.sd.next(value);
    return {
      average: this.sd.m,
      upper: this.sd.m + sd * this.multiplier,
      lower: this.sd.m - sd * this.multiplier,
    };
  }
  nextBar(bar: Close): Band {
    return this.next(bar.c);
  }
  reset(): void {
    this.sd.reset();
  }
  toString(): string {
    return `BB(${this.period}, ${this.multiplier})`;
  }
  toJSON(): JSONDef<BBArgs> {
    return {
      $type: BB.key,
      period: this.period,
      multiplier: this.multiplier,
      sd: this.sd.toJSON(),
    };
  }
  static readonly key = "finance.tr.BB";
  static minBars({ period, sd }: BBArgs): number {
    return Math.max(period, SD.minBars(sd))
  }
  static display(
    { period, multiplier }: BBArgs,
    value = "CLOSE"
  ): string {
    return `BB(${period}, ${multiplier}, ${value})`;
  }
  static from({ period, multiplier, sd }: BBArgs): BB {
    return new BB(period, multiplier, SD.from(sd));
  }
}
