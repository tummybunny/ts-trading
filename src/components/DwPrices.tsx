import { memo, useEffect, useRef, useState } from "react";
import { MarketPrice } from "../contexts/MarketDataContext";

type HitTake = "hit" | "take" | null;
//let timer: NodeJS.Timer | null = null;
let lastMid: number | null | undefined = null;

type BlinkRepeat = {t: NodeJS.Timeout | null, c: number};

const DwPrices = (props: { price: MarketPrice | null }) => {
  const [baBlinks, setBaBlinks] = useState({ b: 0, a: 0 });
  const blinkRepeat = useRef<BlinkRepeat>({t: null, c: 0});

  const repeatInterval = (br: BlinkRepeat, delay: number, action: () => void) => {
    if (br === blinkRepeat.current && br.c - 1 >= 0) {
      br.c = br.c - 1;
      br.t = setTimeout(() => {
        action();
        repeatInterval(br, delay, action)
      }, delay);
    }
  };

  const restartBlink = (ctr: number) => {
    blinkRepeat.current.t && clearTimeout(blinkRepeat.current.t);
    blinkRepeat.current.t = null;
    blinkRepeat.current.c = ctr
  }

  useEffect(() => {
    let mid1 = lastMid;
    let mid2 = props.price?.mid;
    let ht: HitTake = mid1 && mid2 ? (mid2 > mid1 ? "take" : "hit") : null;
    lastMid = props.price?.mid;

    switch (ht) {
      case "hit":
        setBaBlinks({ b: 7, a: 0 });
        restartBlink(7);
        repeatInterval(blinkRepeat.current, 200, () => {
          setBaBlinks((ba) => {
            return { ...ba, b: Math.max(0, ba.b - 1) };
          });
        });
        break;
      case "take":
        setBaBlinks({ b: 0, a: 7 });
        restartBlink(7);
        repeatInterval(blinkRepeat.current, 200, () => {
          setBaBlinks((ba) => {
            return { ...ba, a: Math.max(0, ba.a - 1) };
          });
        });
        break;
      default:
        break;
    }
  }, [props]);

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
