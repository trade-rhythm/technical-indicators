import Big from './Big';
import Fast from './Fast';

export interface JSONDef {
  $type: string;
  [others: string]: any;
}

export interface Serializable {
  toJSON(): JSONDef;
}

export type NumberValue = number | INum;

export interface INum extends Serializable {
  eq(v: NumberValue): boolean;
  gt(v: NumberValue): boolean;
  gte(v: NumberValue): boolean;
  lt(v: NumberValue): boolean;
  lte(v: NumberValue): boolean;
  abs(): INum;
  div(v: NumberValue): INum;
  sub(v: NumberValue): INum;
  add(v: NumberValue): INum;
  mul(v: NumberValue): INum;
  pow(v: NumberValue): INum;
  valueOf(): number;
}

export abstract class Indicator implements Serializable {
  #fast = true;
  setFast(useFast: boolean): void {
    this.#fast = useFast;
  }
  new(value: NumberValue): INum {
    return this.#fast ? new Fast(value as any) as INum : new Big(value as any) as unknown as INum;
  } 
  from(value: any): INum {
    return this.#fast ? Fast.from(value) as INum : (Big as any).from(value) as INum;
  } 
  abstract next(v: number): number | null;
  abstract toJSON(): JSONDef;
}
