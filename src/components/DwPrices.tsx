import { memo, useCallback, useEffect, useRef, useState } from "react";
import { MarketPrice } from "../contexts/MarketDataContext";

type HitTake = "hit" | "take" | null;
type BlinkRepeat = { t: NodeJS.Timeout | null; c: number };

const DwPrices = (props: { price: MarketPrice | null }) => {
  const [baBlinks, setBaBlinks] = useState({ b: 0, a: 0 });
  const blinkRepeat = useRef<BlinkRepeat>({ t: null, c: 0 });
  const lastMid = useRef<number | null>(null);

  const repeatInterval = useCallback(
    (br: BlinkRepeat, delay: number, action: () => void) => {
      if (br === blinkRepeat.current && br.c - 1 >= 0) {
        br.c = br.c - 1;
        br.t = setTimeout(() => {
          action();
          repeatInterval(br, delay, action);
        }, delay);
      }
    },
    []
  );

  const blinkAction = () => {
    setBaBlinks((ba) => {
      return { a: Math.max(0, ba.a - 1), b: Math.max(0, ba.b - 1) };
    });
  };

  const restartBlink = (ctr: number) => {
    blinkRepeat.current.t && clearTimeout(blinkRepeat.current.t);
    blinkRepeat.current.t = null;
    blinkRepeat.current.c = ctr;
  };

  useEffect(() => {
    let mid1 = lastMid.current;
    let mid2 = props.price?.mid || null;
    let ht: HitTake = mid1 && mid2 ? (mid2 > mid1 ? "take" : "hit") : null;
    lastMid.current = mid2;

    switch (ht) {
      case "hit":
        setBaBlinks({ b: 7, a: 0 });
        restartBlink(7);
        repeatInterval(blinkRepeat.current, 250, blinkAction);
        break;
      case "take":
        setBaBlinks({ b: 0, a: 7 });
        restartBlink(7);
        repeatInterval(blinkRepeat.current, 250, blinkAction);
        break;
      default:
        break;
    }
  }, [props, repeatInterval]);

  return (
    <div className="deal-window-prices">
      <div className={`bid ${baBlinks.b % 2 ? "bid-blink" : ""}`}>
        {props.price?.bid || "N/A"}
      </div>
      <div className={`ask ${baBlinks.a % 2 ? "ask-blink" : ""}`}>
        {props.price?.ask || "N/A"}
      </div>
      <div className="mid">{props.price?.mid || "-"}</div>
    </div>
  );
};

export default memo(DwPrices);
export type { HitTake };
