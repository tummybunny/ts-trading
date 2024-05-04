import { useContext } from "react";
import MarketDataContext from "../contexts/MarketDataContext";
import DealWindow from "./DealWindow";

const TradingScreen = () => {
  const md = useContext(MarketDataContext);
  const children = md?.instruments.map((i) => (
    <div style={{ display: "inline-block", verticalAlign: "top" }}>
      <DealWindow instrument={i} key={"Ticker_" + i.ticker} />
    </div>
  ));
  return <span>{children}</span>;
};

export default TradingScreen;
