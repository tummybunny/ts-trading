import * as React from "react";
import MarketDataContext, {
  Instrument,
  MarketData,
  OnMarketPrice,
  Subscribe,
  Unsubscribe,
} from "./contexts/MarketDataContext";
import TradingScreen from "./components/TradingScreen";
import { useEffect, useState } from "react";
import API from "./api/API";

const NOOP: Subscribe = (i, o) => () => {};

const App = () => {
  useEffect(() => {
    document.body.classList.add("theme1");
  }, []);

  const [md, setMd] = useState<MarketData>({
    instruments: [],
    subscribe: NOOP,
  });
  useEffect(() => {
    API.initMarketData()
      .then((md) => {
        console.log("Unable to initialize Market Data", md?.instruments);
        setMd(md);
      })
      .catch((err) => {
        console.error("Unable to initialize Market Data", err);
      });
  }, []);

  return (
    <MarketDataContext.Provider value={md}>
      <TradingScreen />
    </MarketDataContext.Provider>
  );
};

export default App;
