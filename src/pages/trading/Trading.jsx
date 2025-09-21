import AdvancedChart from "./tradingComponents/AdvancedChart";
import CompanyProfile from "./tradingComponents/CompanyProfile";
import FundamentalData from "./tradingComponents/FundamentalData";
import SymbolInfo from "./tradingComponents/SymbolInfo";
import TechnicalAnalysis from "./tradingComponents/TechnicalAnalysis";
import TickerTab from "./tradingComponents/TickerTab";
import TopStories from "./tradingComponents/TopStories";
import { useTheme } from "../../Context/ThemeContext";

function Trading({ stockSymbol }) {
  const { isDarkMode } = useTheme();

  const theme = isDarkMode ? "dark" : "light";
  return (
    <div className="min-h-[110vh] p-5 w-full ">
      <div className="w-full mi-h-[20vh] overflow-hidden mb-3 ">
        <TickerTab
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "ticker"}
        />
      </div>
      <div className="w-full flex justify-end h-[30vh] mb-3 overflow-hidden ">
        <SymbolInfo
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "info"}
        />
      </div>

      <div className="w-full h-[50vh]  overflow-hidden ">
        <AdvancedChart
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "chart"}
        />
      </div>
      <div className="w-full mt-8 grid grid-cols-1 gap-1 justify-items-center md:grid-cols-2 ">
        <CompanyProfile
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "profile"}
        />
        <FundamentalData
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "fundamental"}
        />
      </div>

      <div className="w-full mt-3 grid grid-cols-1 gap-1 justify-items-center md:grid-cols-2  ">
        <TechnicalAnalysis
          symbol={stockSymbol}
          Theme={theme}
          key={stockSymbol + "analysis"}
        />
        <TopStories symbol={stockSymbol} Theme={theme} />
      </div>
    </div>
  );
}
export default Trading;
