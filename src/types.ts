export interface Bar {
  open: number;
  close: number;
  high: number;
  low: number;
}

export type JSONDef<T = Record<string, unknown>> = T & {
  $type: string;
};

export interface Serializable<T> {
  toJSON(): JSONDef<T>;
  display(value: string): string;
}

export interface Indicator<T, V = number, VB = V> extends Serializable<T> {
  next(v: number): V | null;
  nextBar(v: Bar): VB | null;
}
