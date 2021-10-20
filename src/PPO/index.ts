import EMA, { EMAArgs } from "../EMA";
import type { JSONDef, Indicator, Close } from "../types";

export interface PPOArgs {
  fast: EMAArgs;
  slow: EMAArgs;
  signal: EMAArgs;
}

export interface PPOOut {
  ppo: number;
  signal: number;
  histogram: number;
}

export default class PPO implements Indicator<PPOArgs, PPOOut> {
  fast: EMA;
  slow: EMA;
  signal: EMA;
  constructor(
    fast: number | EMA = 12,
    slow: number | EMA = 26,
    signal: number | EMA = 9
  ) {
    this.fast = typeof fast === "number" ? new EMA(fast) : fast;
    this.slow = typeof slow === "number" ? new EMA(slow) : slow;
    this.signal = typeof signal === "number" ? new EMA(signal) : signal;
  }
  next(value: number): PPOOut {
    const fast = this.fast.next(value);
    const slow = this.slow.next(value);

    const ppo = ((fast - slow) / slow) * 100;
    const signal = this.signal.next(ppo);
    const histogram = ppo - signal;

    return {
      ppo,
      signal,
      histogram,
    };
  }
  nextBar(bar: Close): PPOOut {
    return this.next(bar.c);
  }
  reset(): void {
    this.fast.reset();
    this.slow.reset();
    this.signal.reset();
  }
  toString(): string {
    return `PPO(${this.fast.period}, ${this.slow.period}, ${this.signal.period})`;
  }
  toJSON(): JSONDef<PPOArgs> {
    return {
      $type: PPO.key,
      fast: this.fast.toJSON(),
      slow: this.slow.toJSON(),
      signal: this.signal.toJSON(),
    };
  }
  static readonly key = "finance.tr.PPO";
  static display(
    { fast, slow, signal }: PPOArgs,
    value = "CLOSE"
  ): string {
    return `PPO(${fast.period}, ${slow.period}, ${signal.period}, ${value})`;
  }
  static from({ fast, slow, signal }: PPOArgs): PPO {
    return new PPO(EMA.from(fast), EMA.from(slow), EMA.from(signal));
  }
}
