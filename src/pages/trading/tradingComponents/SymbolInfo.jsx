// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function SymbolInfo({ symbol, Theme }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "${symbol}",
          "colorTheme": "${Theme}",
          "isTransparent": false,
          "locale": "en",
          "width": "550",
          "height": "500"
        }`;
    container.current.appendChild(script);
  }, [symbol, Theme]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/?exchange=NASDAQ"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
}

export default React.memo(SymbolInfo);
