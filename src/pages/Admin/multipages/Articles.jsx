import React from "react";
import Style from '../Admin.module.css';
function Articles() {
    return (
        <div className={Style.partners_container}>
            <div className={Style.card}>ادارة المقالات</div>
            <div className={Style.card}>تحليل البيانات</div>
        </div>
    );
}

export default Articles;
