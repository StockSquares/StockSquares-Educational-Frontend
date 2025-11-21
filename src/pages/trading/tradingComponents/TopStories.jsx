// TopStories.jsx
import React, { useEffect, useRef, memo } from 'react';

function TopStories({symbol, Theme}) {
  const container = useRef();

  useEffect(
    () => {
      container.current.innerHTML="";
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "all_symbols",
          "colorTheme": "${Theme}",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": 450
        }`;
      container.current.appendChild(script);
    },
    [Theme]
  );

  return (
    <div className="tradingview-widget-container w-full " ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/news-flow/?priority=top_stories" rel="noopener nofollow" target="_blank"><span className="blue-text">Top stories by TradingView</span></a></div>
    </div>
  );
}

export default memo(TopStories);
