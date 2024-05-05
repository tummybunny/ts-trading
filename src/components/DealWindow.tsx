import { PropsWithChildren, useContext, useEffect, useState } from "react";
import MarketDataContext, { Instrument, MarketPrice } from "../contexts/MarketDataContext";
import DwPrices, { HitTake } from "./DwPrices";
import DwActions from "./DwActions";
import DwMktDepth from "./DwMktDepth";

type DealWindowProp = {
  instrument: Instrument;
};

const DealWindow = (props: PropsWithChildren<DealWindowProp>) => {
    const [price, setPrice] = useState<MarketPrice | null>(null)
    const md = useContext(MarketDataContext)

    useEffect(() => {
        if (md != null) {
            console.log({i: props.instrument, md});
            // subscribe a price stream returns unsub function ...
            console.log(`Subscribing for ${props.instrument.ticker}`);
            const unsub = md.subscribe(props.instrument, mp => {
                setPrice(mp)
            });

            // clean up during unmount:
            return () => { 
                console.log(`Unsubscribing from ${props.instrument.ticker}`);
                unsub();
            };
        }
    }, [props.instrument, md])

  return (
    <div className="window w3d" >
      <div className="window-metadata">
        <div className="tooltip">
            {props.instrument.ticker}
            <span className="tooltiptext">{props.instrument.name}</span>
        </div>
      </div>
      <DwPrices price={price}/>
      <DwActions />
      <DwMktDepth price={price} />
    </div>
  );
};

export default DealWindow;
export type { DealWindowProp };
