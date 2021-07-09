export type WindowArgs<T> = {
  size: number;
  index: number;
  array: T[];
};

// Window is a circular buffer
export default class Window<T = number> {
  index: number;
  size: number;
  #array: T[];
  constructor(size: number, index = 0, array = new Array(size)) {
    this.size = size;
    this.index = 0;
    this.#array = array;
  }
  init(value: T) {
    this.#array.fill(value);
  }
  push(v: T) {
    const oldValue = this.#array[this.index];
    this.#array[this.index] = v;
    this.index = this.index === this.size - 1 ? 0 : this.index + 1;
    return oldValue;
  }
  toJSON() {
    return {
      $type: "finance.tr.Window",
      size: this.size,
      index: this.index,
      array: this.#array,
    };
  }
  static from<T = number>({ size, index, array }: WindowArgs<T>): Window<T> {
    return new Window(size, index, array);
  }
}
