import { useState } from 'react';
import Style from '../../../pages/TryTradingForFree/TryTradingForFree.module.css';
import logo from '../../../assets/imgs/logo-SS.svg';
import styled from 'styled-components';

export const NewTradeModal = ({ isModalOpen, setIsModalOpen }) => {
  const [tradeType, setTradeType] = useState('buy');
  const [profitTarget, setProfitTarget] = useState(1.502);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4 overflow-y-auto">
        <img src={logo} alt="logo" className="w-full h-20 object-contain" />
        <h2 className="font-bold text-lg mt-2 text-center">بدء صفقة جديدة</h2>

        <select className="w-full mt-4 rounded-xl dark:text-black p-2">
          <option value="op1">الدولار</option>
          <option value="op2">الذهب</option>
          <option value="op3">الفضة</option>
          <option value="op4">البترول</option>
        </select>

        <div className="mt-6">
          <p className="font-bold text-lg">نوع الصفقة</p>
          <div className="flex justify-center gap-4 mt-3 flex-wrap">
            {['sell', 'buy'].map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="tradeType"
                  value={type}
                  className="hidden"
                  checked={tradeType === type}
                  onChange={() => setTradeType(type)}
                />
                <span
                  className={`px-5 py-2 rounded-full text-white font-bold text-base transition-all duration-300 ${
                    tradeType === type
                      ? type === 'buy'
                        ? 'bg-green-600'
                        : 'bg-red-600'
                      : 'bg-gray-400 hover:bg-gray-500'
                  }`}
                >
                  {type === 'buy' ? 'شراء' : 'بيع'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg">وقت الصفقة</h2>
          <select className="w-full mt-2 rounded-xl dark:text-black p-2">
            <option value="op1">تنفيذ لحظي</option>
            <option value="op2">شراء معلق</option>
            <option value="op3">بيع معلق</option>
          </select>
        </div>

        {['حجم الصفقة', 'جني الأرباح', 'وقف الخسارة'].map((label, index) => (
  <div className="flex flex-col sm:flex-row sm:items-center mt-4 gap-2" key={index}>
    <h2 className="font-bold text-lg">{label}</h2>
    <div className="flex items-center gap-2 flex-wrap">
      <input
        type="number"
        value={profitTarget}
        onChange={(e) => setProfitTarget(e.target.value)}
        className="w-full sm:w-20 p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
      <div className="flex gap-2">
        <button className="font-bold bg-slate-200 rounded-xl h-10 w-14 dark:text-black">0.10</button>
        <button className="font-bold bg-slate-200 rounded-xl h-10 w-14 dark:text-black">1.00</button>
      </div>
      {label === 'جني الأرباح' && (
        <StyledWrapper2>
          <div className="switch2">
            <input defaultChecked name="check" id="switchBox2" type="checkbox" />
            <label className="slider2" htmlFor="switchBox2" />
          </div>
        </StyledWrapper2>
      )}
      {label === 'وقف الخسارة' && (
        <StyledWrapper>
          <div className="switch">
            <input defaultChecked name="check" id="switchBox" type="checkbox" />
            <label className="slider" htmlFor="switchBox" />
          </div>
        </StyledWrapper>
      )}
    </div>
  </div>
))}


        <div className="flex items-center mt-4 justify-between flex-wrap gap-4 ">
          <p className="font-bold text-right">الربح المتوقع : ...</p>
        </div>

        <div className="flex items-center mt-4 justify-between flex-wrap gap-4">  
          <p className="font-bold text-right">الخسارة المتوقعة : ...</p>
        </div>

        <div className={`${Style.endl} mt-6 text-center`}>
          <hr className="my-2" />
          <p className="font-bold">الهامش المطلوب :</p>
          <p className="font-bold">الهامش الحر :</p>
        </div>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg w-32"
          >
            إلغاء
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg w-32">شراء</button>
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