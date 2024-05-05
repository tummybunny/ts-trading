import { memo, useEffect, useState } from "react";
import { MarketPrice } from "../contexts/MarketDataContext";

type HitTake = "hit" | "take" | null;
//let timer: NodeJS.Timer | null = null;
let lastMid: number | null | undefined = null;

const repeatInterval = (num: number, delay: number, action: () => void) => {
  if (num - 1 >= 0) {
    setTimeout((countDown) => {
      action();
      repeatInterval(countDown, delay, action)
    }, delay, num - 1);
  }
};

const DwPrices = (props: { price: MarketPrice | null }) => {
  const [baBlinks, setBaBlinks] = useState({ b: 0, a: 0 });

  useEffect(() => {
    let mid1 = lastMid;
    let mid2 = props.price?.mid;
    let ht: HitTake = mid1 && mid2 ? (mid2 > mid1 ? "take" : "hit") : null;
    lastMid = props.price?.mid;

    switch (ht) {
      case "hit":
        setBaBlinks({ b: 5, a: 0 });
        repeatInterval(7, 200, () => {
          setBaBlinks((ba) => {
            return { ...ba, b: Math.max(0, ba.b - 1) };
          });
        });
        break;
      case "take":
        setBaBlinks({ b: 0, a: 5 });
        repeatInterval(7, 200, () => {
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
