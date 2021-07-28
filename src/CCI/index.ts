import SMA, { SMAArgs } from "../SMA";
import MAD, { MADArgs } from "../MAD";
import type { JSONDef, Indicator, High, Low, Close } from "../types";

export interface CCIArgs {
  sma: SMAArgs;
  mad: MADArgs;
}

export default class CCI implements Indicator<CCIArgs> {
  period: number;
  sma: SMA;
  mad: MAD;
  constructor(period = 20, sma = new SMA(period), mad = new MAD(period)) {
    this.sma = sma;
    this.mad = mad;
  }
  // TODO: not sure that makes sense?
  next(value: number): number {
    const tp = value;
    const sma = this.sma.next(tp);
    const mad = this.mad.next(value);
    if (mad === 0) {
      return 0;
    }
    return (tp - sma) / (mad * 0.015);
  }
  nextBar(bar: High & Low & Close): number {
    const tp = (bar.close + bar.high + bar.low) / 3;
    const sma = this.sma.next(tp);
    const mad = this.mad.nextBar(bar);
    if (mad === 0) {
      return 0;
    }

    return (tp - sma) / (mad * 0.015);
  }
  display(value: string): string {
    return `CCI(${this.sma.period}, ${value})`;
  }
  toJSON(): JSONDef<CCIArgs> {
    return {
      $type: CCI.key,
      sma: this.sma.toJSON(),
      mad: this.mad.toJSON()
    };
  }
  static key = "finance.tr.CCI";
  static from({ sma, mad }: CCIArgs): CCI {
    return new CCI(sma.period, SMA.from(sma), MAD.from(mad));
  }
}
