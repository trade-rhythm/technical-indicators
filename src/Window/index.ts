import type { JSONDef, Serializable } from "../types";

export type WindowArgs<T> = {
  size: number;
  index: number;
  array: T[];
  needsInit: boolean;
};

// Window is a circular buffer
export default class Window<T = number> implements Serializable {
  index: number;
  size: number;
  #array: T[];
  needsInit: boolean;
  constructor(
    size: number,
    index = 0,
    array = new Array(size),
    needsInit = true
  ) {
    this.size = size;
    this.index = index;
    this.#array = array;
    this.needsInit = needsInit;
  }
  display(value: string): string {
    return `Window(${this.size}, ${value})`;
  }
  init(value: T): void {
    this.needsInit = false;
    this.#array.fill(value);
  }
  get(idx: number): T {
    return this.#array[(this.index + idx) % this.size];
  }
  values(): T[] {
    const out: T[] = [];
    for (let i = this.index; i < this.index + this.size; i++) {
      out.push(this.#array[i % this.size]);
    }
    return out;
  }
  push(v: T): T {
    const oldValue = this.#array[this.index];
    this.#array[this.index] = v;
    this.index = this.index === this.size - 1 ? 0 : this.index + 1;
    return oldValue;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.Window",
      size: this.size,
      index: this.index,
      array: this.#array,
      needsInit: this.needsInit,
    };
  }
  static from<T = number>({
    size,
    index,
    array,
    needsInit,
  }: WindowArgs<T>): Window<T> {
    return new Window(size, index, array, needsInit);
  }
}
