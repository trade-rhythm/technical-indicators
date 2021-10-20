import { JSONDef, Indicator, Close, Volume } from "../types";
import { NextNotImplemented } from "../utils";

export interface OBVArgs {
  obv: number;
  prevClose: number;
}

export default class OBV extends Indicator<OBVArgs> {
  obv: number;
  prevClose: number;
  constructor(obv = 0, prevClose = 0) {
    super();
    this.obv = obv;
    this.prevClose = prevClose;
  }
  next(): number {
    throw new NextNotImplemented("OBV");
  }
  nextBar(bar: Close & Volume): number {
    if (bar.c > this.prevClose) {
      this.obv += bar.v;
    } else if (bar.c < this.prevClose) {
      this.obv -= bar.v;
    }
    this.prevClose = bar.c;
    return this.obv;
  }
  reset(): void {
    this.obv = 0;
    this.prevClose = 0;
  }
  toString(): string {
    return `OBV()`;
  }
  toJSON(): JSONDef<OBVArgs> {
    return {
      $type: OBV.key,
      obv: this.obv,
      prevClose: this.prevClose,
    };
  }
  static readonly key = "finance.tr.OBV";
  static minBars(): number {
    return 0;
  }
  static display(): string {
    return `OBV()`;
  }
  static from({ obv, prevClose }: OBVArgs): OBV {
    return new OBV(obv, prevClose);
  }
}
