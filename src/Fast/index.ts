import type { JSONDef, INum, NumberValue } from "../types";
export interface FastArgs {
  value: number;
}

export default class Fast implements INum {
  value: number;
  constructor(value: Fast | number | string) {
    if (typeof value === "number") {
      this.value = value;
    } else if (value instanceof Fast) {
      this.value = value.value;
    } else {
      this.value = +value;
    }
  }
  eq(v: NumberValue): boolean {
    return this.value == Fast.getValue(v);
  }
  gt(v: NumberValue): boolean {
    return this.value > Fast.getValue(v);
  }
  gte(v: NumberValue): boolean {
    return this.value >= Fast.getValue(v);
  }
  lt(v: NumberValue): boolean {
    return this.value < Fast.getValue(v);
  }
  lte(v: NumberValue): boolean {
    return this.value <= Fast.getValue(v);
  }
  abs(): INum {
    this.value = Math.abs(this.value);
    return this;
  }
  div(v: NumberValue): INum {
    this.value = this.value / Fast.getValue(v);
    return this;
  }
  sub(v: NumberValue): INum {
    this.value = this.value - Fast.getValue(v);
    return this;
  }
  add(v: NumberValue): INum {
    this.value = this.value + Fast.getValue(v);
    return this;
  }
  mul(v: NumberValue): INum {
    this.value = this.value * Fast.getValue(v);
    return this;
  }
  pow(v: NumberValue): INum {
    this.value = Math.pow(this.value, Fast.getValue(v));
    return this;
  }
  valueOf(): number {
    return this.value;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.Fast",
      value: this.value
    };
  }
  static getValue(v: NumberValue): number {
    if (v instanceof Fast) return v.value;
    return v as number;
  }
  static from({ value }: FastArgs): Fast {
    return new Fast(value);
  }
}
