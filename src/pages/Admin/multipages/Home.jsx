import React, { useState } from 'react';
import Style from '../Admin.module.css';
import logo from '../../../assets/imgs/logo-SS.svg';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
const data = [
    {
        name: '1',
        uv: 4000,
    },
    {
        name: '2',
        uv: 3000,
    },
    {
        name: '3',
        uv: 2000,
    },
    {
        name: '4',
        uv: 2780,
    },
    {
        name: '5',
        uv: 1890,
    },
    {
        name: '6',
        uv: 2390,
    },
    {
        name: '7',
        uv: 3490,
    },
];
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
function Home() {
        const [selectedOption, setSelectedOption] = useState("sales");
        const handleRadioChange = (event) => {
            setSelectedOption(event.target.value);
        };
    return (

        <div className={Style.mainContent}>
            <div className={Style.header}>
                <img src={logo} alt="Logo" className={Style.logo} />
                <span className={Style.userCount}>عدد المستخدمين : <strong>1.000.000</strong></span>
            </div>

            <div className={Style.stats}>
                <div className={Style.circle}>
                    <span>عدد المشتركين</span>
                    <strong>10,000</strong>
                </div>
                <div className={Style.circle}>
                    <span>عدد الدول</span>
                    <strong>50</strong>
                </div>
                <div className={Style.circle}>
                    <span>سعر الاشتراك</span>
                    <strong>100$</strong>
                </div>
                <div className={Style.circle}>
                    <span>إجمالي المبيعات</span>
                    <strong>1,000,000$</strong>
                </div>
            </div>

            <div className={Style.chartSection}>
                <h3 className={Style.chartTitle}>إجمالي المبيعات ومتوسط الاشتراك شهرياً</h3>

                <div className={Style.radioSection}>
                    <label className={Style.radioLabel}>اجمالي المبيعات</label>
                        <input 
                            type="radio" 
                            name="option" 
                            value="sales" 
                            checked={selectedOption === "sales"} 
                            onChange={handleRadioChange} 
                        />

                    <label className={Style.radioLabel}>متوسط الاشتراك</label>
                        <input 
                            type="radio" 
                            name="option" 
                            value="subscription" 
                            checked={selectedOption === "subscription"} 
                            onChange={handleRadioChange} 
                        />
                </div>

                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="0 1" />
                        <XAxis dataKey="name" />
                        <YAxis tick={{ dx: -40 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="uv" barSize={20} fill="#02c235" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Home;
