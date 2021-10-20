export interface Open {
  o: number;
}
export interface Close {
  c: number;
}
export interface High {
  h: number;
}
export interface Low {
  l: number;
}
export interface Volume {
  v: number;
}

export type Bar = Open & Close & High & Low & Volume;

export type JSONDef<T = Record<string, unknown>> = T & {
  $type: string;
};

export interface Serializable<T> {
  toJSON(): JSONDef<T>;
  toString(): string;
}

interface Constructor<T, P = unknown> {
  new (): T;
  from: (props: P) => T;
  minBars: (props: P) => number;
}

export abstract class Indicator<T, V = number, VB = V>
  implements Serializable<T>
{
  abstract next(v: number): V | null;
  abstract nextBar(v: High | Low | Open | Close): VB | null;
  abstract reset(): void;
  abstract toJSON(): JSONDef<T>;
  abstract toString(): string;
  static init<C extends Indicator<P, V>, P, V = number>(
    this: Constructor<C, P>,
    props: P,
    values: number[]
  ): [C, V | null] {
    const instance = this.from(props);
    const data = values.slice(-1 * this.minBars(props));
    return [
      instance,
      data.reduce<V | null>(
        (_memo: V | null, value: number): V | null => instance.next(value),
        null as unknown as V
      ),
    ];
  }
  static initBar<
    C extends Indicator<P, V, VB>,
    P,
    V = number,
    VB = V
  >(this: Constructor<C, P>, props: P, bars: Bar[]): [C, VB | null] {
    const instance = this.from(props);
    const data = bars.slice(-1 * this.minBars(props));
    return [
      instance,
      data.reduce<VB | null>(
        (_memo: VB | null, bar: Bar): VB | null => instance.nextBar(bar),
        null as unknown as VB
      ),
    ];
  }
}

export interface SerializableStatic<T = unknown> {
  readonly key: string;
  display(props: T, value?: string, value2?: string): string;
  from(props: T): Serializable<T>;
}

export interface StaticIndicator<T = unknown, V = number, VB = V> {
  minBars(props: T): number;
  init(props: T, bars: number[]): [Indicator<T, V, VB>, V];
  initBar(props: T, bars: Bar[]): [Indicator<T, V, VB>, VB];
}
