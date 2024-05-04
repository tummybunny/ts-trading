import { useState } from "react";
import { MarketDepth, MarketPrice } from "../contexts/MarketDataContext";

const DwMktDepth = (props: { price: MarketPrice | null }) => {
  const [isOpen, setIsOpen] = useState(true);
  const depth = props.price?.depth;
  const toBidAsk = (d: MarketDepth) => (
    <div className={`row-${d.side}`}>
      <div className={`price-${d.side}`}>{d.price}</div>
      <div className={`qty-${d.side}`}>{d.size}</div>
    </div>
  );

  const bids = (depth &&
    depth
      .filter((d) => d.side === "bid")
      .sort((a, b) => a.price - b.price)
      .map(toBidAsk)) || [<></>];
  const asks = (depth &&
    depth
      .filter((d) => d.side === "ask")
      .sort((a, b) => a.price - b.price)
      .map(toBidAsk)) || [<></>];

  const toggleOpen = () => setIsOpen((o) => !o);

  const chevron = isOpen ? (
    <i className="gg-chevron-down-r" onClick={toggleOpen} />
  ) : (
    <i className="gg-chevron-up-r" onClick={toggleOpen} />
  );
  const mdepth = isOpen ? (
    <div className="depth-window">
      <div className="depth-window-rows">
        <div className="row-bid">
          <div className="price-bid title">Price</div>
          <div className="qty-bid title">Size</div>
        </div>
        {bids}
      </div>
      <div className="depth-window-rows">
        <div className="row-ask">
          <div className="price-ask title">Price</div>
          <div className="qty-ask title">Size</div>
        </div>
        {asks}
      </div>
    </div>
  ) : null;

  return <div className="depth-window-toggle">{chevron}{mdepth}</div>;
};

export default DwMktDepth;
