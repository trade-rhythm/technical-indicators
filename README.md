# Technical Indicators

This is a work in progress. Stay tuned!

## Why another technical indicator library?

Most libraries I could find assume the user has all the data up-front (like when running analysis on historical data). I wanted to be able use these indicators when data was streaming in over time. Thus, indicators in this library have two special features:

1. All indicators can be serialized and and deserialed.
2. All indicators follow the "iterator" pattern (where you don't need all the data up front).

These features are helpful in scenarios when you want to calculate an indicator's value over some streaing data and the data comes in over long periods of time. For example, lets say that you wanted to calculate an `EMA(200)` of some dataset where new data comes in ever hour (like an hour bar for example). With this library, you can instanciate your indicator, pass in the next value, and then serialize the indicator back to a DB with out having to keep the indicator in memory the whole time it is being calculated.

## Roadmap

- [x] [EMA](https://www.investopedia.com/terms/e/ema.asp)
- [x] [SMA](https://www.investopedia.com/terms/s/sma.asp)
- [x] [Cross](https://www.investopedia.com/terms/c/crossover.asp)
- [x] MACD
- [x] RSI
- [x] ATR
- [x] TR
- [x] SD
- [x] BB
- [x] MIN
- [x] MAX
- [x] CE
- [x] CCI
- [x] MAD
- [ ] ADL
- [ ] ADX
- [ ] AO
- [ ] CCI
- [ ] FI
- [ ] KST
- [ ] MFI
- [ ] OBV
- [ ] PSAR
- [ ] ROC
- [ ] KD
- [ ] StochRSI
- [ ] TRIX
- [ ] WMA

> Probably more!


## Usage
### Node
```js
import { EMA, Cross, parse } from '@trade-rhythm/technical-indicators';

// init some indicators
const ema = new EMA(9);
const cross = new Cross()

// do something with them
function handleNewData(bar) {
  const value = ema.next(bar.close); // or ema.nextBar(bar);
  if (cross.over(value, bar.close)) {
    // Do something!
  }
}

// serialize indicators to JSON
const state = {ema, cross};
const json = JSON.stringify(state);

// deserialize
const newState = parse(json);
```

> You can also import indicators individually with `import EMA from '@trade-rhythm/technical-indicators/dist/EMA`


### Deno / Browser
```js
import { EMA, Cross, parse } from 'https://unpkg.com/@trade-rhythm/technical-indicators';
```

## Acknowledgements

- Most of these indicators are a port from this awesome library in Rust: https://github.com/greyblake/ta-rs

