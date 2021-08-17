import EMA, { EMAArgs } from "../EMA";
import TR, { TRArgs } from "../TR";
import type { JSONDef, Indicator, High, Low, Close } from "../types";

export interface ATRArgs {
  ema: EMAArgs;
  tr: TRArgs;
}

export default class ATR implements Indicator<ATRArgs> {
  ema: EMA;
  tr: TR;
  constructor(ema: number | EMA = 14, tr: TR = new TR()) {
    this.ema = typeof ema === "number" ? new EMA(ema) : ema;
    this.tr = tr;
  }
  next(value: number): number {
    return this.ema.next(this.tr.next(value));
  }
  nextBar(bar: High & Low & Close): number {
    return this.ema.next(this.tr.nextBar(bar));
  }
  reset(): void {
    this.ema.reset();
    this.tr.reset();
  }
  toString(): string {
    return `ATR(${this.ema.period})`;
  }
  toJSON(): JSONDef<ATRArgs> {
    return {
      $type: ATR.key,
      ema: this.ema.toJSON(),
      tr: this.tr.toJSON(),
    };
  }
  static readonly key = "finance.tr.ATR";
  static display({ ema }: ATRArgs): string {
    return `ATR(${ema.period})`;
  }
  static from({ ema, tr }: ATRArgs): ATR {
    return new ATR(EMA.from(ema), TR.from(tr));
  }
}
