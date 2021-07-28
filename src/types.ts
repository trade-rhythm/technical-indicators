export interface Open {
  open: number;
}
export interface Close {
  close: number;
}
export interface High {
  high: number;
}
export interface Low {
  low: number;
}
export interface Volume {
  volume: number;
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
  nextBar(v: High | Low | Open | Close): VB | null;
}
