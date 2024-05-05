import { useContext, useRef, useState } from "react";
import MarketDataContext, { Instrument } from "../contexts/MarketDataContext";
import DealWindow from "./DealWindow";

const TradingScreen = () => {
  const tickers = useRef(null);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const md = useContext(MarketDataContext);

  const tickerAction = (action: "add" | "remove") => {
    const t = tickers.current?.["value"];
    const instr = md?.instruments.find(i => i.ticker === t)
    if (instr) {
      const exists = instruments.some(i => i.ticker === t)
      switch(action) {
        case "add":
          if (!exists) setInstruments([...instruments, instr]);
          break;
        case "remove":
          if (exists) setInstruments(instruments.filter(i => i.ticker !== t));
          break;
        default:
          break;
      }
    }
  }

  const children = instruments.map((i) => (
    <div
      style={{ display: "inline-block", verticalAlign: "top" }}
      key={`instr_${i.ticker}`}
    >
      <DealWindow instrument={i} key={"Ticker_" + i.ticker} />
    </div>
  ));

  return (
    <>
      <div className="menu">
        <div>Ticker:</div>
        <select title="ticker" style={{height: "1.5rem"}} ref={tickers}>
          {md?.instruments.map( i => (<option value={i.ticker}>{i.ticker}: {i.name}</option>))}
        </select>
        <div className="button menu-button" onClick={_ => tickerAction("add")}>+</div>
        <div className="button menu-button" onClick={_ => tickerAction("remove")}>-</div>
        <div className="button menu-button" onClick={_ => setInstruments([])}>x</div>
      </div>
      <div>
        <span>{children}</span>
      </div>
    </>
  );
};

export default TradingScreen;
