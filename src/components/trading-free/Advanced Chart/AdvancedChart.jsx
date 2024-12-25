import React, { useState } from 'react';

import { 
   XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar
} from 'recharts';
import { 
   
  Clock, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight ,X
} from 'lucide-react';

// Utility Functions
const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const generateData = (count, baseValue, volatility) => 
    Array(count).fill(0).map((_, i) => ({
      time: new Date(Date.now() - (count - i) * 60000).toISOString(),
      price: baseValue + Math.sin(i * 0.5) * volatility + Math.random() * volatility,
      volume: Math.random() * 100,
      bid: baseValue + Math.sin(i * 0.5) * volatility + Math.random() * volatility - 10,
      ask: baseValue + Math.sin(i * 0.5) * volatility + Math.random() * volatility + 10
    }));
  
  
export const AdvancedChart = () => {
    const [showVolume, setShowVolume] = useState(true);
    const chartData = generateData(100, 41000, 500);
    
    return (
      <div className="bg-white rounded-lg shadow-sm h-[500px] p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <PieChart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              <Clock className="w-4 h-4 mr-2" />
              Indicators
            </button>
            <button 
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                showVolume ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
              onClick={() => setShowVolume(!showVolume)}
            >
              Volume
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={showVolume ? "80%" : "100%"}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickFormatter={(time) => new Date(time).toLocaleTimeString()}
              stroke="#94a3b8"
            />
            <YAxis 
              domain={['auto', 'auto']}
              stroke="#94a3b8"
              tickFormatter={(value) => formatNumber(value)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-white border shadow-lg rounded-lg p-3">
                      <div className="text-sm font-medium">
                        ${formatNumber(payload[0].value)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(payload[0].payload.time).toLocaleString()}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {showVolume && (
          <div className="h-[20%]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="volume" fill="#e2e8f0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };
 export  const OrderBook = () => {
    const chartData = generateData(20, 41000, 500);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 h-[500px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">Order Book</h3>
          <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-lg">
            {['0.1', '0.01', '0.001'].map((value) => (
              <button 
                key={value}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  value === '0.1' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'hover:bg-white'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-1 max-h-[400px] overflow-auto">
          {chartData.slice(0, 10).reverse().map((data, i) => (
            <div 
              key={`sell-${i}`} 
              className="flex justify-between text-sm p-1.5 hover:bg-red-50 rounded-md transition-colors"
            >
              <span className="text-red-500">{formatNumber(data.ask)}</span>
              <span>{formatNumber(data.volume)}</span>
              <span className="text-gray-500">{formatNumber(data.ask * data.volume)}</span>
            </div>
          ))}
          
          <div className="py-3 text-center font-medium text-lg border-y my-2">
            ${formatNumber(chartData[chartData.length - 1].price)}
          </div>
          
          {chartData.slice(0, 10).map((data, i) => (
            <div 
              key={`buy-${i}`} 
              className="flex justify-between text-sm p-1.5 hover:bg-green-50 rounded-md transition-colors"
            >
              <span className="text-green-500">{formatNumber(data.bid)}</span>
              <span>{formatNumber(data.volume)}</span>
              <span className="text-gray-500">{formatNumber(data.bid * data.volume)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };