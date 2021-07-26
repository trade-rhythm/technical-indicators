import { JSONDef, Indicator, INum } from "../types";

export interface EMAArgs {
  period: number;
  k: number;
  current: number;
  index: number;
}

export default class EMA extends Indicator {
  period: number;
  k: INum;
  current: INum;
  index: number;
  constructor(period: number, k?: number, current = 0.0, index = 0) {
    super();
    this.period = period;
    this.k = typeof k === "number"
        ? this.new(k)
        : this.new(2).div(period + 1);
    this.current = this.new(current);
    this.index = index;
  }
  next(value: number): number {
    this.index++;
    if (this.index < this.period) {
      this.current = this.current.add(value);
      return this.current.div(this.index).valueOf();
    } else if (this.index === this.period) {
      this.current = this.current.add(value).div(this.period);
    } else {
      this.current = this.new(value)
        .sub(this.current)
        .mul(this.k)
        .add(this.current);
    }
    return this.current.valueOf();
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.EMA",
      period: this.period,
      k: this.k.valueOf(),
      current: this.current.valueOf(),
      index: this.index
    };
  }
  static from({ period, k, current, index }: EMAArgs): EMA {
    return new EMA(period, k, current, index);
  }
}
