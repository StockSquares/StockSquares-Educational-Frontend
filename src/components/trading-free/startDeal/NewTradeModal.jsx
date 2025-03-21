import {useState } from 'react';
import Style from '../../../pages/TryTradingForFree/TryTradingForFree.module.css';
import logo from '../../../assets/imgs/logo-SS.svg';
import styled from 'styled-components';

export const NewTradeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [tradeType, setTradeType] = useState('buy');
  const [profitTarget, setProfitTarget] = useState(1.502);
  if (!isModalOpen) return null; 
  return (
    <div className="fixed inset-0 flex items-center justify-center mt-20 bg-black bg-opacity-50 backdrop-blur-md z-50">
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl max-w-md text-center">
      <img src={logo} alt="logo"/>
      <h2 className="font-bold text-xl mt-2">بدء صفقة جديدة</h2>

      <select name="typeofmoney" id="typeofmoney" className='w-full mt-2 rounded-xl dark:text-black' >
        <option value="op1">الدولار</option>
        <option value="op2">الذهب</option>
        <option value="op3">الفضة</option>
        <option value="op4">البترول</option>
      </select>

      <div className='font-bold text-xl mt-6 flex items-center justify-between'>
        <p className='mt-5'>نوع الصفقة</p>
        <div className="flex justify-center gap-6 mt-6">
          <label className="cursor-pointer">
          <input
              type="radio"
              name="tradeType"
              value="sell"
              className="hidden"
              checked={tradeType === 'sell'}
              onChange={() => setTradeType('sell')}
            />
            <span className={`px-5 py-2 rounded-full text-white font-bold transition ${
              tradeType === 'sell' ? 'bg-red-600' : 'bg-gray-400 hover:bg-gray-500'
            }`}>
               بيع
            </span>
          </label>

          <label className="cursor-pointer">
          <input
              type="radio"
              name="tradeType"
              value="buy"
              className="hidden"
              checked={tradeType === 'buy'}
              onChange={() => setTradeType('buy')}
            />
            <span className={`px-5 py-2 rounded-full text-white font-bold transition ${
              tradeType === 'buy' ? 'bg-green-600' : 'bg-gray-400 hover:bg-gray-500'
            }`}>
              شراء
            </span>
          </label>
        </div>
      </div>
      <h2 className="font-bold text-xl mt-10">وقت الصفقة</h2>
      <select name="typeofmoney" id="typeofmoney" className='w-full mt-2 rounded-xl dark:text-black' >
        <option value="op1">تنفيذ لحظي </option>
        <option value="op2">شراء معلق </option>
        <option value="op3">بيع معلق </option>
      </select>
      <div className='flex mt-2'>
      <h2 className="font-bold text-lg mt-4 ml-2">حجم الصفقة</h2>
      <input type="number" value={profitTarget} onChange={e => setProfitTarget(e.target.value)}
        className="w-24 p-2 mt-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"/>
     <button className='mr-auto ml-5 font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>0.10</button>
     <button className='font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>1.00</button>
     </div>
     <div className='flex items-center mt-2'>
      <h2 className="font-bold text-lg  ml-2">جني الأرباح</h2>
      <input type="number" value={profitTarget} onChange={e => setProfitTarget(e.target.value)}
      className="w-24 p-2 mr-5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"/>
      <button className='mr-auto ml-5 font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>0.10</button>
      <button className='font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>1.00</button>
     </div>
     <div className='flex items-center mt-3 mb-5 justify-between'>
    <StyledWrapper2>
      <div className="switch2">
        <input defaultChecked name="check" id="switchBox2" defaultValue type="checkbox" />
        <label className="slider2" htmlFor="switchBox2" />
      </div>
   </StyledWrapper2>
   <p>الربح المتوقع : ...</p>
    </div>

     <div className='flex items-center mt-2 '>
      <h2 className="font-bold text-lg  ml-2">وقف الخسارة</h2>
      <input type="number" value={profitTarget} onChange={e => setProfitTarget(e.target.value)}
        className="w-24 p-2  rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"/>
      <button className='mr-auto ml-5 font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>0.10</button>
      <button className='font-bold bg-slate-200 rounded-xl h-10 w-10 mt-2 dark:text-black'>1.00</button>
    </div>
    <div className='flex items-center mt-3 mb-5 justify-between'>
    <StyledWrapper>
      <div className="switch">
        <input defaultChecked name="check" id="switchBox" defaultValue type="checkbox" />
        <label className="slider" htmlFor="switchBox" />
      </div>
   </StyledWrapper>
    <p>الخسارة المتوقعة : ...</p>
    </div>
      <div className={Style.endl}>
       <hr />
      <p>الهامش المطلوب : </p>
      <p>الهامش الحر : </p>
      </div>


      <div className="mt-4 flex justify-center gap-4">
        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded-lg">إلغاء</button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">شراء</button>
      </div>
    </div>
  </div>
  );
};

const StyledWrapper = styled.div`
  .switch {
    --w-switch: 120px;
    --h-switch: calc((var(--w-switch) / 3));
    --inset-switch: calc(var(--w-switch) * (3.75 / 100));
    --clr-on: #27ae60;
    --clr-off: #ff0000;
    --shadow-sz: calc((var(--w-switch) * (1.2 / 100)));
    width: var(--w-switch);
    height: var(--h-switch);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
    margin: 0px auto;
    position: relative;
    border-radius: 9999px;
    box-shadow:
      inset 0px var(--shadow-sz) var(--shadow-sz) rgba(0, 0, 0, 0.5),
      0px var(--shadow-sz) var(--shadow-sz) rgba(255, 255, 255, 0.2),
      0 2px 5px rgba(0, 0, 0, 0.25);
  }
  .switch::before,
  .switch::after {
    --sh-i: calc(var(--w-switch) * (0.8 / 100));
    --sh-o: calc((var(--w-switch) * (0.8 / 100)) * -1);
    position: absolute;
    z-index: 0;
    font-size: calc(var(--w-switch) * (12 / 100));
    line-height: 1.5;
    font-weight: bold;
    text-shadow:
      0 var(--sh-o) var(--sh-i) #4e4e4e,
      var(--sh-o) 0 var(--sh-i) #4e4e4e,
      var(--sh-o) var(--sh-o) var(--sh-i) #4e4e4e,
      var(--sh-i) var(--sh-o) var(--sh-i) #1d1d1d,
      0 var(--sh-i) var(--sh-i) #111111,
      var(--sh-o) var(--sh-i) var(--sh-i) #111111,
      var(--sh-i) var(--sh-i) var(--sh-i) #000000,
      var(--sh-i) 0 var(--sh-i) #000000;
  }
  .switch::before {
    content: "ON";
    color: var(--clr-on);
    left: 12.5%;
  }
  .switch::after {
    content: "OFF";
    color: var(--clr-off);
    right: 12.5%;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
    visibility: hidden;
  }

  .slider {
    display: block;
    width: calc((var(--w-switch) / 2) - (var(--inset-switch) * 2));
    height: calc(100% - (var(--inset-switch) * 2));
    cursor: pointer;
    position: absolute;
    left: var(--inset-switch);
    z-index: 1;
    margin-bottom: -1px;
    background: #fcfff4
      linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    border-radius: 9999px;
    transition: all 0.4s ease;
    box-shadow:
      inset 0 -2px 10px 1px rgba(100, 100, 100),
      0px 2px 5px 0px rgba(0, 0, 0, 0.3),
      0 1px 10px rgba(0, 0, 0, 0.3);
  }
  .slider::after {
    content: "";
    --sz-bump: calc(
      100% - ((var(--w-switch) * (10 / 100)) + (var(--inset-switch) / 2))
    );
    width: var(--sz-bump);
    height: var(--sz-bump);
    position: absolute;
    inset: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-off);
    border-radius: 50px;
    transition: all 0.4s ease;
    box-shadow:
      inset 0px 1px 1px rgba(0, 0, 0),
      0px 1px 0px rgba(255, 255, 255, 0.9);
    margin-right:-35px;  
  }

  .switch input[type="checkbox"]:checked + .slider {
    left: calc((var(--w-switch) / 2) + var(--inset-switch));
  }
  .switch input[type="checkbox"]:checked + .slider::after {
    background: var(--clr-on);
  }`;

  const StyledWrapper2 = styled.div`
  .switch2 {
    --w-switch: 120px;
    --h-switch: calc((var(--w-switch) / 3));
    --inset-switch: calc(var(--w-switch) * (3.75 / 100));
    --clr-on: #27ae60;
    --clr-off: #ff0000;
    --shadow-sz: calc((var(--w-switch) * (1.2 / 100)));
    width: var(--w-switch);
    height: var(--h-switch);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
    margin: 0px auto;
    position: relative;
    border-radius: 9999px;
    box-shadow:
      inset 0px var(--shadow-sz) var(--shadow-sz) rgba(0, 0, 0, 0.5),
      0px var(--shadow-sz) var(--shadow-sz) rgba(255, 255, 255, 0.2),
      0 2px 5px rgba(0, 0, 0, 0.25);
  }
  .switch2::before,
  .switch2::after {
    --sh-i: calc(var(--w-switch) * (0.8 / 100));
    --sh-o: calc((var(--w-switch) * (0.8 / 100)) * -1);
    position: absolute;
    z-index: 0;
    font-size: calc(var(--w-switch) * (12 / 100));
    line-height: 1.5;
    font-weight: bold;
    text-shadow:
      0 var(--sh-o) var(--sh-i) #4e4e4e,
      var(--sh-o) 0 var(--sh-i) #4e4e4e,
      var(--sh-o) var(--sh-o) var(--sh-i) #4e4e4e,
      var(--sh-i) var(--sh-o) var(--sh-i) #1d1d1d,
      0 var(--sh-i) var(--sh-i) #111111,
      var(--sh-o) var(--sh-i) var(--sh-i) #111111,
      var(--sh-i) var(--sh-i) var(--sh-i) #000000,
      var(--sh-i) 0 var(--sh-i) #000000;
  }
  .switch2::before {
    content: "ON";
    color: var(--clr-on);
    left: 12.5%;
  }
  .switch2::after {
    content: "OFF";
    color: var(--clr-off);
    right: 12.5%;
  }

  .switch2 input {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
    visibility: hidden;
  }

  .slider2 {
    display: block;
    width: calc((var(--w-switch) / 2) - (var(--inset-switch) * 2));
    height: calc(100% - (var(--inset-switch) * 2));
    cursor: pointer;
    position: absolute;
    left: var(--inset-switch);
    z-index: 1;
    margin-bottom: -1px;
    background: #fcfff4
      linear-gradient(to bottom, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
    border-radius: 9999px;
    transition: all 0.4s ease;
    box-shadow:
      inset 0 -2px 10px 1px rgba(100, 100, 100),
      0px 2px 5px 0px rgba(0, 0, 0, 0.3),
      0 1px 10px rgba(0, 0, 0, 0.3);
  }
  .slider2::after {
    content: "";
    --sz-bump: calc(
      100% - ((var(--w-switch) * (10 / 100)) + (var(--inset-switch) / 2))
    );
    width: var(--sz-bump);
    height: var(--sz-bump);
    position: absolute;
    inset: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-off);
    border-radius: 50px;
    transition: all 0.4s ease;
    box-shadow:
      inset 0px 1px 1px rgba(0, 0, 0),
      0px 1px 0px rgba(255, 255, 255, 0.9);
    margin-right:-35px;  
  }

  .switch2 input[type="checkbox"]:checked + .slider2 {
    left: calc((var(--w-switch) / 2) + var(--inset-switch));
  }
  .switch2 input[type="checkbox"]:checked + .slider2::after {
    background: var(--clr-on);
  }`;

