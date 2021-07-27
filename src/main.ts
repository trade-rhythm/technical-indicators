import ATR, { ATRArgs } from "./ATR";
import BB, { BBArgs } from "./BB";
import CE, { CEArgs } from "./CE";
import Cross, { CrossArgs } from "./Cross";
import EMA, { EMAArgs } from "./EMA";
import MACD, { MACDArgs } from "./MACD";
import MAX, { MAXArgs } from "./MAX";
import MIN, { MINArgs } from "./MIN";
import RSI, { RSIArgs } from "./RSI";
import SD, { SDArgs } from "./SD";
import SMA, { SMAArgs } from "./SMA";
import TR, { TRArgs } from "./TR";
import Window, { WindowArgs } from "./Window";

const parse = (json: string): unknown => {
  return JSON.parse(json, (_, value) => {
    switch (value?.$type) {
      case ATR.key:
        return ATR.from(value as ATRArgs);
      case BB.key:
        return BB.from(value as BBArgs);
      case CE.key:
        return CE.from(value as CEArgs);
      case Cross.key:
        return Cross.from(value as CrossArgs);
      case EMA.key:
        return EMA.from(value as EMAArgs);
      case MACD.key:
        return MACD.from(value as MACDArgs);
      case MAX.key:
        return MAX.from(value as MAXArgs);
      case MIN.key:
        return MIN.from(value as MINArgs);
      case RSI.key:
        return RSI.from(value as RSIArgs);
      case SD.key:
        return SD.from(value as SDArgs);
      case SMA.key:
        return SMA.from(value as SMAArgs);
      case TR.key:
        return TR.from(value as TRArgs);
      case Window.key:
        return Window.from(value as WindowArgs<unknown>);
      default:
        return value;
    }
  });
};

export { lt, lte, gt, gte, eq, neq } from "./utils";
export { ATR, BB, CE, Cross, EMA, MACD, MAX, MIN, RSI, SD, SMA, TR, Window, parse };
