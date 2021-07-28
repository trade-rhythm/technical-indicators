import ATR, { ATRArgs } from "./ATR";
import BB, { BBArgs } from "./BB";
import CCI, { CCIArgs } from "./CCI";
import CE, { CEArgs } from "./CE";
import Cross, { CrossArgs } from "./Cross";
import EMA, { EMAArgs } from "./EMA";
import ER, { ERArgs } from "./ER";
import FAST_STOCH, { FAST_STOCHArgs } from "./FAST_STOCH";
import KC, { KCArgs } from "./KC";
import MACD, { MACDArgs } from "./MACD";
import MAD, { MADArgs } from "./MAD";
import MAX, { MAXArgs } from "./MAX";
import MFI, { MFIArgs } from './MFI';
import MIN, { MINArgs } from "./MIN";
import OBV, { OBVArgs } from "./OBV";
import PPO, { PPOArgs } from "./PPO";
import ROC, { ROCArgs } from './ROC';
import RSI, { RSIArgs } from "./RSI";
import SD, { SDArgs } from "./SD";
import SLOW_STOCH, { SLOW_STOCHArgs } from "./SLOW_STOCH";
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
      case CCI.key:
        return CCI.from(value as CCIArgs);
      case CE.key:
        return CE.from(value as CEArgs);
      case Cross.key:
        return Cross.from(value as CrossArgs);
      case EMA.key:
        return EMA.from(value as EMAArgs);
      case ER.key:
        return ER.from(value as ERArgs);
      case FAST_STOCH.key:
        return FAST_STOCH.from(value as FAST_STOCHArgs);
      case KC.key:
        return KC.from(value as KCArgs);
      case MACD.key:
        return MACD.from(value as MACDArgs);
      case MAD.key:
        return MAD.from(value as MADArgs);
      case MAX.key:
        return MAX.from(value as MAXArgs);
      case MFI.key:
        return MFI.from(value as MFIArgs);
      case MIN.key:
        return MIN.from(value as MINArgs);
      case OBV.key:
        return OBV.from(value as OBVArgs);
      case PPO.key:
        return PPO.from(value as PPOArgs);
      case ROC.key:
        return ROC.from(value as ROCArgs);
      case RSI.key:
        return RSI.from(value as RSIArgs);
      case SD.key:
        return SD.from(value as SDArgs);
      case SLOW_STOCH.key:
        return SLOW_STOCH.from(value as SLOW_STOCHArgs);
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
export {
  ATR,
  BB,
  CCI,
  CE,
  Cross,
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
  parse
};
