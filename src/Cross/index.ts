import type { JSONDef, Serializable } from "../types";

export default class Cross implements Serializable {
  isOver?: boolean;
  constructor(isOver?: boolean) {
    this.isOver = isOver;
  }
  cross(val1: number, val2: number): boolean {
    const prev = this.isOver;
    if (val1 > val2) {
      this.isOver = true;
    } else if (val1 === val2) {
      // do nothing
    } else {
      this.isOver = false;
    }
    return typeof prev !== "undefined" && prev !== this.isOver;
  }
  over(val1: number, val2: number): boolean {
    if (val1 > val2) {
      const prev = this.isOver;
      this.isOver = true;
      if (prev === false) {
        return true;
      }
    } else {
      this.isOver = false;
    }
    return false;
  }
  under(val1: number, val2: number): boolean {
    if (val1 < val2) {
      const prev = this.isOver;
      this.isOver = false;
      if (prev === true) {
        return true;
      }
    } else {
      this.isOver = true;
    }
    return false;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.crisp.Cross",
      isOver: this.isOver,
    };
  }
  static from({ isOver }: { isOver: boolean }): Cross {
    return new Cross(isOver);
  }
}
