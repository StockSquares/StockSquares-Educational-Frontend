import React from "react";
import Style from '../Admin.module.css';
function Ads() {
    return (
        <div className={Style.partners_container}>
            <div className={Style.card}>ادارة الاعلانات</div>
            <div className={Style.card}>تقارير الاداء</div>
        </div>
    );
}

export default Ads;
