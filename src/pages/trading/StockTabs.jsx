import { TabItem, Tabs } from "flowbite-react";
import Trading from "./Trading";
import { MARKETS } from "./Markets";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

function StockTabs() {
  const [count, setCount] = useState(10);
  const [index, setIndex] = useState(0);
  const [marketId, setMarketId] = useState(0);
  const [selectedStock, setSelectedStock] = useState(0);
  const [selectedMarket, setSelectedMarket] = useState("EGX:COMI");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr(MARKETS[selectedStock].data.slice(index, index + count));
  }, [count, index, selectedStock]);

  const next = (inx) => {
    if (inx === selectedStock && index + count < MARKETS[inx].data.length) {
      setIndex(index + count);
    } else {
      setIndex(0);
    }
  };

  const previous = (inx) => {
    if (inx === selectedStock && index - count >= 0) {
      setIndex(index - count);
    }
  };

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setCount(4);
      } else if (window.innerWidth < 1155) {
        setCount(5);
      } else {
        setCount(10);
      }
      setIndex(0);
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <>
      <Tabs
        onActiveTabChange={(tabIndex) => {
          setSelectedStock(tabIndex);
          setIndex(0);
        }}
        className="mt-2"
      >
        {MARKETS.map((market, inx) => (
          <TabItem key={market.id} title={market.name}>
            <div className=" w-full flex items-center justify-between px-3">
              <FontAwesomeIcon
                icon={faArrowCircleRight}
                onClick={() => previous(inx)}
              />
              {arr.map((subMarket, idx) => (
                <p
                  key={idx}
                  onClick={() =>{
                     setSelectedMarket(subMarket);
                     setMarketId(market.id);
                  }}
                  className={` ${
                    selectedMarket === subMarket
                      ? "bg-primary-800 text-white"
                      : ""
                  } cursor-pointer text-[15px] px-4 py-1 text-primary-900 hover:bg-primary-800 hover:text-white bg-gray-50 font-semibold rounded-lg border-2 border-primary-300`}
                >
                  {subMarket.split(":")[1]}
                </p>
              ))}
              <FontAwesomeIcon
                icon={faArrowCircleLeft}
                onClick={() => next(inx)}
              />
            </div>
          </TabItem>
        ))}
      </Tabs>

      <Trading stockSymbol={selectedMarket} marketId={marketId} />
    </>
  );
}

export default StockTabs;
