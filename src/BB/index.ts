import SD, { SDArgs } from "../SD";
import type { JSONDef, Indicator, Close } from "../types";

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

export default class BB implements Indicator<BBArgs, Band> {
  period: number;
  multiplier: number;
  sd: SD;
  constructor(period = 9, multiplier = 2, sd = new SD(period)) {
    this.period = period;
    this.multiplier = multiplier;
    this.sd = sd;
  }
  toString(): string {
    return `BB(${this.period}, ${this.multiplier})`;
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
    return this.next(bar.close);
  }
  toJSON(): JSONDef<BBArgs> {
    return {
      $type: BB.key,
      period: this.period,
      multiplier: this.multiplier,
      sd: this.sd.toJSON(),
    };
  }
  static key = "finance.tr.BB";
  static display({ period, multiplier }: BBArgs, value: string = "CLOSE"): string {
    return `BB(${period}, ${multiplier}, ${value})`;
  }
  static from({ period, multiplier, sd }: BBArgs): BB {
    return new BB(period, multiplier, SD.from(sd));
  }
}
