export interface JSONDef {
  $type: string;
  [key: string]: unknown;
}

export interface Serializable {
  toJSON(): JSONDef;
  display(value: string): string;
}

export interface Indicator extends Serializable {
  next(v: number): number | null;
}
