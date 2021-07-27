export type JSONDef<T = Record<string, unknown>> = T & {
  $type: string;
};

export interface Serializable<T> {
  toJSON(): JSONDef<T>;
  display(value: string): string;
}

export interface Indicator<T, V = number> extends Serializable<T> {
  next(v: number): V | null;
}
