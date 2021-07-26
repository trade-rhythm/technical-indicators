import { BigFloat, set_precision } from "bigfloat-esnext";
import type { JSONDef, INum } from "../types";

export interface BigArgs {
  value: string;
}

set_precision(-4);

const proto: INum = BigFloat.prototype as unknown  as INum;
proto.toJSON = function (): JSONDef {
  return {
    $type: "finance.tr.Big",
    value: this.toString()
  };
};

proto.valueOf = function (): number {
  return +this.toString();
};

(BigFloat as any).from = function ({ value }: BigArgs): BigFloat {
  return new BigFloat(value);
};

export default BigFloat;
