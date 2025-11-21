// TechnicalAnalysis.jsx
import React, { useEffect, useRef, memo } from "react";

function TechnicalAnalysis({symbol, Theme}) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "colorTheme": "${Theme}",
          "displayMode": "single",
          "isTransparent": false,
          "locale": "en",
          "interval": "1m",
          "disableInterval": false,
          "width": "100%",
          "height": 450,
          "symbol": "${symbol}",
          "showIntervalTabs": true
        }`;
    container.current.appendChild(script);
  }, [symbol, Theme]);

  return (
    <div className="tradingview-widget-container w-full " ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/technicals/?exchange=NASDAQ"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">
            Technical analysis for AAPL by TradingView
          </span>
        </a>
      </div>
    </div>
  );
}

export default memo(TechnicalAnalysis);
