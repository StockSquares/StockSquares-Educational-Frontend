import React from "react";
import Style from '../Admin.module.css';
function Partners() {
    return (
        <div className={Style.partners_container}>
            <div className={Style.card}>الرئيسية</div>
            <div className={Style.card}>طلبات الانضمام</div>
            <div className={Style.card}>تقارير الأداء</div>
            <div className={Style.card}>إدارة العمليات</div>
            <div className={Style.card}>المعاملات المالية</div>
        </div>
    );
}

export default Partners;
