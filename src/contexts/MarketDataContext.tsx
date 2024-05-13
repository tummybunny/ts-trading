import { createContext } from 'react';

type Instrument = {
    name: string,
    ticker: string
}

type MarketDepth = {
    side: 'bid' | 'ask',
    price: number,
    size: number
}

type MarketPrice = {
    ticker: string,
    bid: number | null,
    mid: number | null,
    ask: number | null,
    timestamp: number,
    depth: MarketDepth[] | null
}

type Unsubscribe = () => void
type OnMarketPrice = (m: MarketPrice) => void
type Subscribe = (ins: Instrument, omp: OnMarketPrice) => Unsubscribe

type MarketData = {
    instruments: Instrument[],
    subscribe: Subscribe
};

const MarketDataContext = createContext<MarketData | null>(null)

export default MarketDataContext
export type { Instrument, MarketDepth, MarketPrice, MarketData, Subscribe, Unsubscribe, OnMarketPrice }
