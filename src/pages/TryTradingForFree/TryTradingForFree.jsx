import React, { useEffect, useState } from 'react';

import Style from './TryTradingForFree.module.css';
import { AdvancedChart, OrderBook } from '../../components/trading-free/Advanced Chart/AdvancedChart';
import { ApexChart } from '../../components/trading-free/candlesStick/candlesStick';
import { TradingTable } from '../../components/trading-free/table/table/table';

function TryTradingForFree() {
    const [counter, setCounter] = useState(0);



    useEffect(() => {
        
    }, []);

    return (
        
          <div className="h-screen  bg-gray-50 flex flex-col">
          
            <div className="flex flex-1 overflow-hidden">
             
      
              <div className="flex-1   p-6 overflow-auto">
              <div className="w-auto">
                    <TradingTable/>
                  </div>
                  
                <div className=" grid grid-cols-3 gap-6 ">
                  
                  <div className="col-span-4 " >
                    <ApexChart/>
                  </div>
                  <div className="col-span-2 ">
                    <AdvancedChart/>
                  </div>
                  <div >
                    <OrderBook/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      };
      


export default TryTradingForFree