import ADX from "./ADX";
import AO from "./AO";
import ATR from "./ATR";
import BB from "./BB";
import CCI from "./CCI";
import CE from "./CE";
import Cross from "./Cross";
import DMI from "./DMI";
import EMA from "./EMA";
import ER from "./ER";
import FAST_STOCH from "./FAST_STOCH";
import KC from "./KC";
import MACD from "./MACD";
import MAD from "./MAD";
import MAX from "./MAX";
import MFI from "./MFI";
import MIN from "./MIN";
import OBV from "./OBV";
import PPO from "./PPO";
import ROC from "./ROC";
import RSI from "./RSI";
import SD from "./SD";
import SLOW_STOCH from "./SLOW_STOCH";
import SMA from "./SMA";
import TR from "./TR";
import Window from "./Window";
import { SerializableStatic } from "./types";

const collection = {
  [ADX.key]: ADX,
  [AO.key]: AO,
  [ATR.key]: ATR,
  [BB.key]: BB,
  [CCI.key]: CCI,
  [CE.key]: CE,
  [Cross.key]: Cross,
  [DMI.key]: DMI,
  [ER.key]: ER,
  [EMA.key]: EMA,
  [FAST_STOCH.key]: FAST_STOCH,
  [MACD.key]: MACD,
  [KC.key]: KC,
  [MAD.key]: MAD,
  [MAX.key]: MAX,
  [MFI.key]: MFI,
  [MIN.key]: MIN,
  [OBV.key]: OBV,
  [PPO.key]: PPO,
  [ROC.key]: ROC,
  [RSI.key]: RSI,
  [SD.key]: SD,
  [SLOW_STOCH.key]: SLOW_STOCH,
  [SMA.key]: SMA,
  [TR.key]: TR,
  [Window.key]: Window,
} as const;

const parse = (json: string): unknown => {
  return JSON.parse(json, (_, value) => {
    const key = value?.$type as keyof typeof collection | undefined;
    if (key && key in collection) {
      return collection[key].from(value);
    }
    return value;
  });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __assertStatic: Record<keyof typeof collection, SerializableStatic> =
  collection;

export * from "./types";
export * from "./utils";
export {
  ADX,
  AO,
  ATR,
  BB,
  CCI,
  CE,
  Cross,
  DMI,
  ER,
  EMA,
  FAST_STOCH,
  MACD,
  KC,
  MAD,
  MAX,
  MFI,
  MIN,
  OBV,
  PPO,
  ROC,
  RSI,
  SD,
  SLOW_STOCH,
  SMA,
  TR,
  Window,
  parse,
  collection,
};
