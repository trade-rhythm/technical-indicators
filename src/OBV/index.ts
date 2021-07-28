import type { JSONDef, Indicator, Close, Volume } from "../types";

export interface OBVArgs {
  obv: number;
  prevClose: number;
}

export default class OBV implements Indicator<OBVArgs> {
  obv: number;
  prevClose: number;
  constructor(obv = 0, prevClose = 0) {
    this.obv = obv;
    this.prevClose = prevClose;
  }
  next(): number {
    throw Error("OBV: next method not implemented");
  }
  nextBar(bar: Close & Volume): number {
    if (bar.close > this.prevClose) {
      this.obv += bar.volume;
    } else if (bar.close < this.prevClose) {
      this.obv -= bar.volume;
    }
    this.prevClose = bar.close;
    return this.obv;
  }
  display(value: string): string {
    return `OBV(${value})`;
  }
  toJSON(): JSONDef<OBVArgs> {
    return {
      $type: OBV.key,
      obv: this.obv,
      prevClose: this.prevClose
    };
  }
  static key = "finance.tr.OBV";
  static from({ obv, prevClose }: OBVArgs): OBV {
    return new OBV(obv, prevClose);
  }
}
