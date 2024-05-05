import { useContext, useEffect, useReducer, useRef, useState } from "react";
import MarketDataContext, { Instrument } from "../contexts/MarketDataContext";
import DealWindow from "./DealWindow";

type InstrumentAction = {
  type: "add" | "remove" | "clear" | "load";
  instruments?: Instrument[];
};

const TradingScreen = () => {
  const firstTime = useRef(true);
  const selectedTicker = useRef(null);
  const md = useContext(MarketDataContext);

  const tickerAction = (
    instruments: Instrument[],
    action: InstrumentAction
  ) => {
    let modified = instruments;
    if (action.type === "clear") {
      modified = [];
    } else if (action.type === "load" && action.instruments) {
      modified = action.instruments;
    } else {
      const t = selectedTicker.current?.["value"];
      const instr = md?.instruments.find((i) => i.ticker === t);
      if (instr) {
        const exists = instruments.some((i) => i.ticker === t);
        switch (action.type) {
          case "add":
            if (!exists) modified = [...instruments, instr];
            break;
          case "remove":
            if (exists) modified = instruments.filter((i) => i.ticker !== t);
            break;
          default:
            break;
        }
      }
    }
    if (instruments !== modified) {
      const tickersToStore = modified.map((it) => it.ticker);
      console.log(`Saved tickers: ${JSON.stringify(tickersToStore)}`);
      localStorage.setItem("tickers", JSON.stringify(tickersToStore));
    }
    return modified;
  };

  const [instruments, dispatch] = useReducer(tickerAction, []);

  useEffect(() => {
    if ((md?.instruments?.length || 0) > 0 && firstTime.current) {
      const tickersToLoad = localStorage.getItem("tickers");
      firstTime.current = false;
      if (tickersToLoad) {
        console.log(`Loaded tickers: ${tickersToLoad}`);
        try {
          let all = JSON.parse(tickersToLoad) as string[];
          var instrFromLocalStorage = all.flatMap((t) => {
            const i = md?.instruments?.find((i) => i.ticker === t);
            return i ? [i] : [];
          });
          dispatch({
            type: "load",
            instruments: instrFromLocalStorage,
          });
        } catch {}
      }
    }
  }, [md]);

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
        <select
          title="ticker"
          style={{ height: "1.5rem" }}
          ref={selectedTicker}
        >
          {md?.instruments.map((i) => (
            <option value={i.ticker} key={`opt_${i.ticker}`}>
              {i.ticker}: {i.name}
            </option>
          ))}
        </select>
        <div
          className="button menu-button"
          onClick={(_) => dispatch({ type: "add" })}
        >
          +
        </div>
        <div
          className="button menu-button"
          onClick={(_) => dispatch({ type: "remove" })}
        >
          -
        </div>
        <div
          className="button menu-button"
          onClick={(_) => dispatch({ type: "clear" })}
        >
          x
        </div>
      </div>
      <div>
        <span>{children}</span>
      </div>
    </>
  );
};

export default TradingScreen;
