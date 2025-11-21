// EconomicCalendar.jsx
import React, { useEffect, useRef, memo } from 'react';

function EconomicCalendar({Theme}) {
  const container = useRef();

  useEffect(
    () => {
    container.current.innerHTML="";
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "colorTheme": "${Theme}",
          "isTransparent": false,
          "locale": "en",
          "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",
          "importanceFilter": "-1,0,1",
          "width": "100%",
          "height": 550
        }`;
      container.current.appendChild(script);
    },
    [Theme]
  );

  return (
    <div className="tradingview-widget-container w-full" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/economic-calendar/" rel="noopener nofollow" target="_blank"><span className="blue-text">Economic Calendar</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(EconomicCalendar);
