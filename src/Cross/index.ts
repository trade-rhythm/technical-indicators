import { gt, lt, eq } from "../utils";
import type { JSONDef, Serializable } from "../types";

export interface CrossArgs {
  isOver: boolean;
}

export default class Cross implements Serializable<CrossArgs> {
  isOver?: boolean;
  constructor(isOver?: boolean) {
    this.isOver = isOver;
  }
  display(value: string): string {
    return `CROSS(${value})`;
  }
  cross(val1: number, val2: number): boolean {
    const prev = this.isOver;
    if (gt(val1, val2)) {
      this.isOver = true;
    } else if (eq(val1, val2)) {
      // do nothing
    } else {
      this.isOver = false;
    }
    return typeof prev !== "undefined" && prev !== this.isOver;
  }
  over(val1: number, val2: number): boolean {
    if (gt(val1, val2)) {
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
    if (lt(val1, val2)) {
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
  toJSON(): JSONDef<CrossArgs> {
    return {
      $type: "finance.crisp.Cross",
      isOver: this.isOver,
    };
  }
  static from({ isOver }: CrossArgs): Cross {
    return new Cross(isOver);
  }
}
