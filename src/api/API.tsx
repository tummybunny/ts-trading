import {
  Instrument,
  MarketData,
  MarketDepth,
  MarketPrice,
  OnMarketPrice
} from "../contexts/MarketDataContext";

// const INSTRUMENTS = [
//    { ticker: "AAPL", name: "Apple Inc. Common Stock", basePrice: 183.38 },
// ]
const INSTRUMENTS = [
  { ticker: "AAPL", name: "Apple Inc. Common Stock", basePrice: 183.38 },
  {
    ticker: "ABNB",
    name: "Airbnb, Inc. Class A Common Stock",
    basePrice: 159.71,
  },
  { ticker: "ADBE", name: "Adobe Inc. Common Stock", basePrice: 486.18 },
  {
    ticker: "ADI",
    name: "Analog Devices, Inc. Common Stock",
    basePrice: 199.63,
  },
  {
    ticker: "ADP",
    name: "Automatic Data Processing, Inc. Common Stock",
    basePrice: 241.89,
  },
  { ticker: "ADSK", name: "Autodesk, Inc. Common Stock", basePrice: 215.19 },
  {
    ticker: "AEP",
    name: "American Electric Power Company, Inc. Common Stock",
    basePrice: 88.6,
  },
  {
    ticker: "AMAT",
    name: "Applied Materials, Inc. Common Stock",
    basePrice: 204.09,
  },
  {
    ticker: "AMD",
    name: "Advanced Micro Devices, Inc. Common Stock",
    basePrice: 150.6,
  },
  { ticker: "AMGN", name: "Amgen Inc. Common Stock", basePrice: 311.29 },
  { ticker: "AMZN", name: "Amazon.com, Inc. Common Stock", basePrice: 186.21 },
  { ticker: "ANSS", name: "ANSYS, Inc. Common Stock", basePrice: 319.52 },
  {
    ticker: "ASML",
    name: "ASML Holding N.V. New York Registry Shares",
    basePrice: 901.63,
  },
  { ticker: "AVGO", name: "Broadcom Inc. Common Stock", basePrice: 1278.11 },
  {
    ticker: "AZN",
    name: "AstraZeneca PLC American Depositary Shares",
    basePrice: 76.35,
  },
  { ticker: "BIIB", name: "Biogen Inc. Common Stock", basePrice: 217.51 },
  {
    ticker: "BKNG",
    name: "Booking Holdings Inc. Common Stock",
    basePrice: 3577.38,
  },
  {
    ticker: "BKR",
    name: "Baker Hughes Company Class A Common Stock",
    basePrice: 31.92,
  },
  {
    ticker: "CCEP",
    name: "Coca-Cola Europacific Partners plc Ordinary Shares",
    basePrice: 71.81,
  },
  {
    ticker: "CDNS",
    name: "Cadence Design Systems, Inc. Common Stock",
    basePrice: 281.63,
  },
  { ticker: "CDW", name: "CDW Corporation Common Stock", basePrice: 219.56 },
  {
    ticker: "CEG",
    name: "Constellation Energy Corporation Common Stock",
    basePrice: 194.86,
  },
  {
    ticker: "CHTR",
    name: "Charter Communications, Inc. Class A Common Stock New",
    basePrice: 265.93,
  },
  {
    ticker: "CMCSA",
    name: "Comcast Corporation Class A Common Stock",
    basePrice: 38.69,
  },
  {
    ticker: "COST",
    name: "Costco Wholesale Corporation Common Stock",
    basePrice: 743.9,
  },
  { ticker: "CPRT", name: "Copart, Inc. (DE) Common Stock", basePrice: 55.2 },
  {
    ticker: "CRWD",
    name: "CrowdStrike Holdings, Inc. Class A Common Stock",
    basePrice: 310.21,
  },
  {
    ticker: "CSCO",
    name: "Cisco Systems, Inc. Common Stock (DE)",
    basePrice: 47.12,
  },
  { ticker: "CSGP", name: "CoStar Group, Inc. Common Stock", basePrice: 91.23 },
  { ticker: "CSX", name: "CSX Corporation Common Stock", basePrice: 33.85 },
  {
    ticker: "CTAS",
    name: "Cintas Corporation Common Stock",
    basePrice: 674.04,
  },
  {
    ticker: "CTSH",
    name: "Cognizant Technology Solutions Corporation Class A Common Stock",
    basePrice: 66.25,
  },
  {
    ticker: "DASH",
    name: "DoorDash, Inc. Class A Common Stock",
    basePrice: 113.81,
  },
  {
    ticker: "DDOG",
    name: "Datadog, Inc. Class A Common Stock",
    basePrice: 124.27,
  },
  { ticker: "DLTR", name: "Dollar Tree Inc. Common Stock", basePrice: 120.73 },
  { ticker: "DXCM", name: "DexCom, Inc. Common Stock", basePrice: 128.37 },
  {
    ticker: "EA",
    name: "Electronic Arts Inc. Common Stock",
    basePrice: 129.56,
  },
  { ticker: "EXC", name: "Exelon Corporation Common Stock", basePrice: 37.41 },
  {
    ticker: "FANG",
    name: "Diamondback Energy, Inc. Common Stock",
    basePrice: 201.5,
  },
  { ticker: "FAST", name: "Fastenal Company Common Stock", basePrice: 68.43 },
  { ticker: "FTNT", name: "Fortinet, Inc. Common Stock", basePrice: 58.88 },
  {
    ticker: "GEHC",
    name: "GE HealthCare Technologies Inc. Common Stock",
    basePrice: 79.47,
  },
  {
    ticker: "GFS",
    name: "GlobalFoundries Inc. Ordinary Shares",
    basePrice: 49.27,
  },
  {
    ticker: "GILD",
    name: "Gilead Sciences, Inc. Common Stock",
    basePrice: 64.78,
  },
  {
    ticker: "GOOG",
    name: "Alphabet Inc. Class C Capital Stock",
    basePrice: 168.99,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc. Class A Common Stock",
    basePrice: 167.24,
  },
  {
    ticker: "HON",
    name: "Honeywell International Inc. Common Stock",
    basePrice: 195.81,
  },
  {
    ticker: "IDXX",
    name: "IDEXX Laboratories, Inc. Common Stock",
    basePrice: 480.6,
  },
  { ticker: "ILMN", name: "Illumina, Inc. Common Stock", basePrice: 117.93 },
  { ticker: "INTC", name: "Intel Corporation Common Stock", basePrice: 30.9 },
  { ticker: "INTU", name: "Intuit Inc. Common Stock", basePrice: 629.27 },
  {
    ticker: "ISRG",
    name: "Intuitive Surgical, Inc. Common Stock",
    basePrice: 381.36,
  },
  {
    ticker: "KDP",
    name: "Keurig Dr Pepper Inc. Common Stock",
    basePrice: 33.83,
  },
  {
    ticker: "KHC",
    name: "The Kraft Heinz Company Common Stock",
    basePrice: 36.35,
  },
  { ticker: "KLAC", name: "KLA Corporation Common Stock", basePrice: 696.59 },
  { ticker: "LIN", name: "Linde plc Ordinary Shares", basePrice: 423.6 },
  {
    ticker: "LRCX",
    name: "Lam Research Corporation Common Stock",
    basePrice: 908.53,
  },
  {
    ticker: "LULU",
    name: "lululemon athletica inc. Common Stock",
    basePrice: 355.15,
  },
  {
    ticker: "MAR",
    name: "Marriott International Class A Common Stock",
    basePrice: 234.59,
  },
  {
    ticker: "MCHP",
    name: "Microchip Technology Incorporated Common Stock",
    basePrice: 91.36,
  },
  {
    ticker: "MDB",
    name: "MongoDB, Inc. Class A Common Stock",
    basePrice: 362.85,
  },
  {
    ticker: "MDLZ",
    name: "Mondelez International, Inc. Class A Common Stock",
    basePrice: 69.89,
  },
  {
    ticker: "MELI",
    name: "MercadoLibre, Inc. Common Stock",
    basePrice: 1630.56,
  },
  {
    ticker: "META",
    name: "Meta Platforms, Inc. Class A Common Stock",
    basePrice: 451.96,
  },
  { ticker: "MNST", name: "Monster Beverage Corporation", basePrice: 55.0 },
  { ticker: "MRNA", name: "Moderna, Inc. Common Stock", basePrice: 125.0 },
  {
    ticker: "MRVL",
    name: "Marvell Technology, Inc. Common Stock",
    basePrice: 68.51,
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation Common Stock",
    basePrice: 406.66,
  },
  {
    ticker: "MU",
    name: "Micron Technology, Inc. Common Stock",
    basePrice: 114.7,
  },
  { ticker: "NFLX", name: "Netflix, Inc. Common Stock", basePrice: 579.34 },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation Common Stock",
    basePrice: 887.89,
  },
  {
    ticker: "NXPI",
    name: "NXP Semiconductors N.V. Common Stock",
    basePrice: 257.85,
  },
  {
    ticker: "ODFL",
    name: "Old Dominion Freight Line, Inc. Common Stock",
    basePrice: 185.06,
  },
  {
    ticker: "ON",
    name: "ON Semiconductor Corporation Common Stock",
    basePrice: 70.37,
  },
  {
    ticker: "ORLY",
    name: "O'Reilly Automotive, Inc. Common Stock",
    basePrice: 1012.95,
  },
  {
    ticker: "PANW",
    name: "Palo Alto Networks, Inc. Common Stock",
    basePrice: 296.21,
  },
  { ticker: "PAYX", name: "Paychex, Inc. Common Stock", basePrice: 120.1 },
  { ticker: "PCAR", name: "PACCAR Inc. Common Stock", basePrice: 104.79 },
  {
    ticker: "PDD",
    name: "PDD Holdings Inc. American Depositary Shares",
    basePrice: 140.18,
  },
  { ticker: "PEP", name: "PepsiCo, Inc. Common Stock", basePrice: 176.15 },
  {
    ticker: "PYPL",
    name: "PayPal Holdings, Inc. Common Stock",
    basePrice: 65.7,
  },
  {
    ticker: "QCOM",
    name: "QUALCOMM Incorporated Common Stock",
    basePrice: 179.64,
  },
  {
    ticker: "REGN",
    name: "Regeneron Pharmaceuticals, Inc. Common Stock",
    basePrice: 957.0,
  },
  {
    ticker: "ROP",
    name: "Roper Technologies, Inc. Common Stock",
    basePrice: 517.21,
  },
  { ticker: "ROST", name: "Ross Stores, Inc. Common Stock", basePrice: 130.84 },
  {
    ticker: "SBUX",
    name: "Starbucks Corporation Common Stock",
    basePrice: 73.11,
  },
  {
    ticker: "SIRI",
    name: "Sirius XM Holdings Inc. Common Stock",
    basePrice: 3.12,
  },
  { ticker: "SNPS", name: "Synopsys, Inc. Common Stock", basePrice: 536.94 },
  {
    ticker: "TEAM",
    name: "Atlassian Corporation Class A Common Stock",
    basePrice: 183.52,
  },
  { ticker: "TMUS", name: "T-Mobile US, Inc. Common Stock", basePrice: 164.6 },
  { ticker: "TSLA", name: "Tesla, Inc. Common Stock", basePrice: 181.19 },
  {
    ticker: "TTD",
    name: "The Trade Desk, Inc. Class A Common Stock",
    basePrice: 88.59,
  },
  {
    ticker: "TTWO",
    name: "Take-Two Interactive Software, Inc. Common Stock",
    basePrice: 145.88,
  },
  {
    ticker: "TXN",
    name: "Texas Instruments Incorporated Common Stock",
    basePrice: 178.91,
  },
  {
    ticker: "VRSK",
    name: "Verisk Analytics, Inc. Common Stock",
    basePrice: 237.33,
  },
  {
    ticker: "VRTX",
    name: "Vertex Pharmaceuticals Incorporated Common Stock",
    basePrice: 401.08,
  },
  {
    ticker: "WBA",
    name: "Walgreens Boots Alliance, Inc. Common Stock",
    basePrice: 17.81,
  },
  {
    ticker: "WBD",
    name: "Warner Bros. Discovery, Inc. Series A Common Stock",
    basePrice: 7.97,
  },
  {
    ticker: "WDAY",
    name: "Workday, Inc. Class A Common Stock",
    basePrice: 255.78,
  },
  { ticker: "XEL", name: "Xcel Energy Inc. Common Stock", basePrice: 54.25 },
  { ticker: "ZS", name: "Zscaler, Inc. Common Stock", basePrice: 177.11 },
];

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
    INSTRUMENTS.find((i) => i.ticker === instr.ticker)?.basePrice || 100;
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
          const p = updateMockPrice(instr, prices.get(instr));
          if (((Math.random() * 3) | 0) === 0) {
            prices.set(instr, p);
            s.forEach((subscriber) => subscriber(p));
          }
        });
      }, 500);

      // type Subscribe = (ins: Instrument, omp: OnMarketPrice) => Unsubscribe

      resolve({
        instruments: INSTRUMENTS,
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
