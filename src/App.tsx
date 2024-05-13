import MarketDataContext, {
  MarketData,
  Subscribe,
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

  const initMarketData = () => {
    API.initMarketData()
      .then((md) => {
        console.log("Initialized Market Data", md?.instruments);
        setMd(md);
      })
      .catch((err) => {
        console.error("Unable to initialize Market Data", err);
      });
  };

  useEffect(() => initMarketData(), []);

  return (
    <MarketDataContext.Provider value={md}>
      <TradingScreen />
    </MarketDataContext.Provider>
  );
};

export default App;
