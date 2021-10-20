import ATR, { ATRArgs } from "../ATR";
import EMA, { EMAArgs } from "../EMA";
import { JSONDef, Indicator, High, Low, Close } from "../types";

export interface KCArgs {
  period: number;
  multiplier: number;
  atr: ATRArgs;
  ema: EMAArgs;
}

interface KCOutput {
  average: number;
  upper: number;
  lower: number;
}

export default class KC extends Indicator<KCArgs, KCOutput> {
  period: number;
  multiplier: number;
  ema: EMA;
  atr: ATR;
  constructor(
    period = 10,
    multiplier = 2,
    atr = new ATR(period),
    ema = new EMA(period)
  ) {
    super();
    this.period = period;
    this.multiplier = multiplier;
    this.atr = atr;
    this.ema = ema;
  }
  next(value: number): KCOutput {
    const atr = this.atr.next(value);
    const avg = this.ema.next(value);
    return {
      average: avg,
      upper: avg + atr * this.multiplier,
      lower: avg - atr * this.multiplier,
    };
  }
  nextBar(bar: High & Low & Close): KCOutput {
    const typical = (bar.c + bar.h + bar.l) / 3.0;
    const atr = this.atr.nextBar(bar);
    const avg = this.ema.next(typical);
    return {
      average: avg,
      upper: avg + atr * this.multiplier,
      lower: avg - atr * this.multiplier,
    };
  }
  reset(): void {
    this.atr.reset();
    this.ema.reset();
  }
  toString(): string {
    return `KC(${this.period}, ${this.multiplier})`;
  }
  toJSON(): JSONDef<KCArgs> {
    return {
      $type: KC.key,
      period: this.period,
      multiplier: this.multiplier,
      atr: this.atr.toJSON(),
      ema: this.ema.toJSON(),
    };
  }
  static readonly key = "finance.tr.KC";
  static minBars({ period }: KCArgs): number {
    return period;
  }
  static display({ period, multiplier }: KCArgs): string {
    return `KC(${period}, ${multiplier})`;
  }
  static from({ period, multiplier, atr, ema }: KCArgs): KC {
    return new KC(period, multiplier, ATR.from(atr), EMA.from(ema));
  }
}
