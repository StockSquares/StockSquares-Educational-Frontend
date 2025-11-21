// ForexCrossRates.jsx
import React, { useEffect, useRef, memo } from "react";

function ForexCrossRates({Theme}) {
  const container = useRef();

  useEffect(() => {
    container.current.innerHTML="";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "colorTheme": "${Theme}",
          "isTransparent": false,
          "locale": "en",
          "currencies": [
            "EUR",
            "USD",
            "JPY",
            "GBP",
            "CHF",
            "AUD",
            "CAD",
            "NZD",
            "CNY"
          ],
          "backgroundColor": "#ffffff",
          "width": "100%",
          "height": 400
        }`;
    container.current.appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container mt-3 mb-3 w-full" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/markets/currencies/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Forex market</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(ForexCrossRates);
