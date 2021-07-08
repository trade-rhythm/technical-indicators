export default class EMA {
  period: number;
  k: number;
  current: number;
  isNew: boolean;
  constructor(
    period: number,
    k: number = 2 / (period + 1),
    current: number = 0.0,
    isNew: boolean = true,
  ) {
    this.period = period;
    this.k = k;
    this.current = current;
    this.isNew = isNew;
  }
  next(value: number): number {
    if (this.isNew) {
      this.isNew = false;
      this.current = value;
    } else {
      this.current = this.k * value + (1 - this.k) * this.current;
    }
    return this.current;
  }
  toJSON() {
    return {
      $type: 'finance.tr.EMA',
      period: this.period,
      k: this.k,
      current: this.current,
      isNew: this.isNew,
    };
  }
  static from({
    period,
    k,
    current,
    isNew,
  }: {
    period: number;
    k: number;
    current: number;
    isNew: boolean;
  }): EMA {
    return new EMA(period, k, current, isNew);
  }
}
