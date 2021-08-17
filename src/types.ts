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
  toString(): string;
}

export interface Indicator<T, V = number, VB = V> extends Serializable<T> {
  next(v: number): V | null;
  nextBar(v: High | Low | Open | Close): VB | null;
  reset(): void;
}

export interface SerializableStatic<T = unknown> {
  readonly key: string;
  display(props: T, value?: string, value2?: string): string;
  from(props: T): Serializable<T>;
}
