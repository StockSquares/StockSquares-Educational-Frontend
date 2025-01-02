import React, { useState } from 'react';

import { 
   
 ArrowUpRight, ArrowDownRight ,X
} from 'lucide-react';


const SideNav = ({ isOpen, onClose, type, initialData }) => {
    return (
      <div
        className={`fixed -top-1 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3 border-b flex justify-between items-center">
          <h2 className="text-base font-semibold">
            {type === 'buy' ? 'شراء جديد' : 'بيع جديد'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
  
        <OrderForm
          type={type}
          initialData={initialData}
          onClose={onClose}
        />
      </div>
    );
  };
  
  // Order Form Component
  const OrderForm = ({ type, initialData, onClose }) => {
    const [orderType, setOrderType] = useState('limit');
    const orderTypes = ['limit', 'market', 'stop'];
  
    return (
      <div className="p-4">
        <div className="flex mb-4 bg-gray-50 p-1 rounded-lg">
          {orderTypes.map((otype) => (
            <button
              key={otype}
              onClick={() => setOrderType(otype)}
              className={`flex-1 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                orderType === otype
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'hover:bg-white'
              }`}
            >
              {otype}
            </button>
          ))}
        </div>
  
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs text-gray-600">الكمية</label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                defaultValue={initialData?.amount}
              />
              <div className="absolute  left-1 top-2 flex space-x-1">
                {['25%', '50%', '75%', '100%'].map((percent) => (
                  <button
                    key={percent}
                    className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-50 rounded"
                  >
                    {percent}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {orderType !== 'market' && (
            <div className="space-y-1">
              <label className="block text-xs text-gray-600">السعر (USDT)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                defaultValue={initialData?.price}
              />
            </div>
          )}
  
          {orderType === 'stop' && (
            <div className="space-y-1">
              <label className="block text-xs text-gray-600">سعر الإيقاف (USDT)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          )}
  
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="block text-xs text-gray-500">المجموع (USDT)</span>
              <span className="text-xs font-medium">
                {initialData ? (initialData.price * initialData.amount).toFixed(2) : '0.00'}
              </span>
            </div>
            <div>
              <span className="block text-xs text-gray-500">المتاح</span>
              <span className="text-xs font-medium">50,000.00</span>
            </div>
          </div>
  
          <button
            onClick={onClose}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              type === 'buy'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {type === 'buy' ? 'تأكيد الشراء' : 'تأكيد البيع'}
          </button>
        </div>
      </div>
    );
  };
  
  ///table
  
  
 export  const TradingTable = () => {
    const [orders, setOrders] = useState([
      { type: 'buy', price: 43650.00, amount: 0.5731, typec: 'etc', market: 'البورصة المصرية', active: false },
        { type: 'sell', price: 43645.75, amount: 0.2891, typec: 'bitcoin', market: 'البورصة السعودية', active: false },
        { type: 'buy', price: 43640.50, amount: 0.3456, typec: 'usdd', market: 'السوق الاماراتية', active: false },
        { type: 'sell', price: 43635.25, amount: 0.4123, typec: 'usdd', market: 'البورصة الامريكية', active: false },
        { type: 'buy', price: 43633.00, amount: 0.1234, typec: 'bitcoin', market: 'العملات المشفرة', active: false },
      // { type: 'sell', price: 43630.50, amount: 0.5678, typec: 'etc', market: 'ETC/USDT', active: false }
    ]);
  
    const [selectedMarket, setSelectedMarket] = useState('all');
    const [sideNav, setSideNav] = useState({
      isOpen: false,
      type: null,
      data: null
    });
    
    const markets = ['all', ...new Set(orders.map(order => order.market))];
    const filteredOrders = selectedMarket === 'all' 
      ? orders 
      : orders.filter(order => order.market === selectedMarket);
  
    const handleOrderAction = (order, actionType) => {
      setSideNav({
        isOpen: true,
        type: actionType,
        data: order
      });
    };
  
    const closeSideNav = () => {
      setSideNav({
        isOpen: false,
        type: null,
        data: null
      });
    };
  
    const TableHeader = () => (
      <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-60 dark:text-white dark:bg-black  border-b pb-2">
        <div className="col-span-1  ">نوع</div>
        <div className="col-span-1 text-left">السعر USDT</div>
        <div className="col-span-1 text-left">الكمية</div>
        <div className="col-span-1 text-left">المجموع USDT</div>
        <div className="col-span-1 text-left">الصنف</div>
        <div className="col-span-2 text-center">الإجراءات</div>
      </div>
    );
  
    return (
      <div className="w-full dark:bg-black space-y-4">
        <div className="flex justify-start gap-2 mb-4">
          {markets.map(market => (
            <button
              key={market}
              onClick={() => setSelectedMarket(market)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedMarket === market
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {market === 'all' ? 'البورصة العالمية' : market}
            </button>
          ))}
        </div>
  
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow-sm">
          <TableHeader />
          <div className="space-y-1 mt-2">
            {filteredOrders.map((order, index) => {
              const total = order.price * order.amount;
              
              return (
                <div
                  key={index}
                  className="grid grid-cols-7 gap-4 text-sm items-center py-2 dark:bg-black hover:bg-gray-50 transition-colors rounded"
                >
                  <div className="col-span-1">
                    {order.type === 'buy' ? (
                      <span className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1" size={16} />
                        شراء
                      </span>
                    ) : (
                      <span className="flex items-center text-red-600">
                        <ArrowDownRight className="mr-1" size={16} />
                        بيع
                      </span>
                    )}
                  </div>
                  <div className={`text-left ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {order.price.toFixed(2)}
                  </div>
                  <div className="text-left">
                    {order.amount.toFixed(4)}
                  </div>
                  <div className="text-left text-gray-600 dark:text-white">
                    {total.toFixed(2)}
                  </div>
                  <div className="text-left text-gray-600 capitalize dark:text-white">
                    {order.typec}
                  </div>
                  <div className="col-span-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleOrderAction(order, 'buy')}
                      className="px-4 py-1 rounded text-sm transition-colors bg-green-100 text-green-600 hover:bg-green-200"
                    >
                      شراء
                    </button>
                    <button
                      onClick={() => handleOrderAction(order, 'sell')}
                      className="px-4 py-1 rounded text-sm transition-colors bg-red-100 text-red-600 hover:bg-red-200"
                    >
                      بيع
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        <SideNav 
          isOpen={sideNav.isOpen}
          onClose={closeSideNav}
          type={sideNav.type}
          initialData={sideNav.data}
        />
      </div>
    );
  };
  