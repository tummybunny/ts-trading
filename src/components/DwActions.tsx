const DwActions = () => {
  return (
    <div>
        <div className="deal-window-action">
          <div className="market bid w3d button">BUY</div>
          <div className="market ask w3d button">SELL</div>
        </div>
        <div className="deal-window-action">
          <div className="bid w3d button">BID</div>
          <div className="size input">1000</div>
          <div className="ask w3d button">ASK</div>
        </div>
      </div>
  );
};

export default DwActions;