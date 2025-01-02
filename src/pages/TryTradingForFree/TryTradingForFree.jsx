import React, { useEffect, useState } from 'react';
import Style from './TryTradingForFree.module.css';
import { AdvancedChart, OrderBook } from '../../components/trading-free/Advanced Chart/AdvancedChart';
import { ApexChart } from '../../components/trading-free/candlesStick/candlesStick';
import { TradingTable } from '../../components/trading-free/table/table';
import { BarChart3, CandlestickChart } from 'lucide-react';

function TryTradingForFree() {
  const [counter, setCounter] = useState(0);
  const [activeChart, setActiveChart] = useState('candle');

  useEffect(() => {
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-black flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          <div className="w-auto">
            <TradingTable />
          </div>

          <div className="mb-4 flex justify-end space-x-2">
            <button
              onClick={() => setActiveChart('candle')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeChart === 'candle'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CandlestickChart className="h-4 w-4" />
              الشموع اليابانية
            </button>
            <button
              onClick={() => setActiveChart('chart')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeChart === 'chart'
                  ? 'bg-green-700 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              المخططات الرسومية 
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {activeChart === 'candle' ? (
              <div className="col-span-4">
                <ApexChart />
              </div>
            ) : (
              <>
                <div className="col-span-3">
                  <AdvancedChart />
                </div>
                <div className="col-span-1">
                  <OrderBook />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryTradingForFree;