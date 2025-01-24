import React from "react";
import Style from '../Admin.module.css';
function Employees() {
    return (
        <div className={Style.partners_container}>
            <div className={Style.card}>الرئيسية</div>
            <div className={Style.card}>اضافة موظفين</div>
            <div className={Style.card}>تقارير الأداء</div>
            <div className={Style.card}>إدارة العمليات</div>
            <div className={Style.card}>المعاملات المالية</div>
        </div>
    );
}

export default Employees;
