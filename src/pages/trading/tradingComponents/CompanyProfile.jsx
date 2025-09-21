// CompanyProfile.jsx
import React, { useEffect, useRef, memo } from "react";

function CompanyProfile({ symbol, Theme }) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "symbol": "${symbol}",
          "colorTheme": "${Theme}",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": 400
        }`;
    container.current.appendChild(script);
  }, [symbol, Theme]);

  return (
    <div className="tradingview-widget-container w-full " ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/symbols/NASDAQ-AAPL/?exchange=NASDAQ"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">AAPL symbol info by TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(CompanyProfile);
