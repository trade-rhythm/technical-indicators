import { JSONDef, Indicator, INum } from "../types";

export interface TRArgs {
  prev: INum | number | null;
}

export default class TR extends Indicator {
  prev: INum | null;
  constructor(prev: INum | number | null = null) {
    super();
    this.prev = typeof prev === "number" ? this.new(prev) : prev;
  }
  next(value: number): number {
    const prev = this.prev;
    this.prev = this.new(value);
    if (prev !== null) {
      return this.prev.sub(prev).abs().valueOf();
    }
    return 0;
  }
  toJSON(): JSONDef {
    return {
      $type: "finance.tr.TR",
      prev: this.prev?.valueOf() ?? null,
    };
  }
  static from({ prev }: TRArgs): TR {
    return new TR(prev);
  }
}
