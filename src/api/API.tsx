import {
  Instrument,
  MarketData,
  MarketDepth,
  MarketPrice,
  OnMarketPrice
} from "../contexts/MarketDataContext";
import Configuration from "../conf";

const srand = () => (((Math.random() * 100) | 0) - 50) / 100;
const rand = () => ((Math.random() * 100) | 0) / 100;
const dp2 = (n: number) => ((n * 100) | 0) / 100;

const createMarketDepth = (bid: number, ask: number, mid: number) => {
  const depth: MarketDepth[] = [];
  const d = (2 + Math.random() * 15) | 0;
  let lowest = bid;
  let highest = ask;

  for (let i = 0; i < d; i++) {
    let price: number;
    if (((Math.random() * 2) | 0) === 0) {
      price = highest + rand();
      highest = price;
    } else {
      price = lowest + rand();
      lowest = price;
    }
    depth.push({
      price: dp2(price),
      size: ((Math.random() * 1000) | 0) + 1000,
      side: price <= mid ? "bid" : "ask",
    });
  }
  return depth;
};

const createMockPrice: (instr: Instrument) => MarketPrice = (instr) => {
  const adj = rand();
  const basePrice =
    Configuration.mock.instruments.find((i) => i.ticker === instr.ticker)?.basePrice || 100;
  const bid = dp2(basePrice - adj);
  const mid = dp2(basePrice);
  const ask = dp2(basePrice + adj);
  const depth = createMarketDepth(bid, ask, mid);
  return {
    ticker: instr.ticker,
    bid,
    mid,
    ask,
    depth,
    timestamp: performance.now(),
  };
};

const updateMockPrice: (
  i: Instrument,
  existingPrice: MarketPrice | null | undefined
) => MarketPrice = (i, e) => {
  if (e) {
    const r = rand();
    const mid = dp2((e.ask! + e.bid!) / 2 + srand());
    const bid = dp2(e.mid! - r);
    const ask = dp2(e.mid! + r);
    const depth = createMarketDepth(bid, ask, mid);
    return { ...e, bid, ask, mid, timestamp: performance.now(), depth };
  } else {
    return createMockPrice(i);
  }
};

const API = {
  async initMarketData(): Promise<MarketData> {
    const subs = new Map<Instrument, Set<OnMarketPrice>>();
    const prices = new Map<Instrument, MarketPrice>();

    return new Promise((resolve, reject) => {
      setInterval(() => {
        subs.forEach((s, instr) => {
          if (!prices.get(instr) || ((Math.random() * Configuration.mock.updateProbability) | 0) === 0) {
            const p = updateMockPrice(instr, prices.get(instr));
            prices.set(instr, p);
            s.forEach((subscriber) => subscriber(p));
          }
        });
      }, Configuration.mock.publishIntervalMillis);

      // type Subscribe = (ins: Instrument, omp: OnMarketPrice) => Unsubscribe

      resolve({
        instruments: Configuration.mock.instruments,
        subscribe: (ins, omp) => {
          const omps = subs.get(ins) || new Set();
          omps.add(omp);
          subs.set(ins, omps);
          console.log(`Subscribed ${ins.ticker}. Total subscribers: ${omps.size}`);

          return () => {
            omps.delete(omp);
            console.log(`Unsubscribed ${ins.ticker}. Total subscribers: ${omps.size}`);
          };
        },
      });
    });
  },
};

export default API;
