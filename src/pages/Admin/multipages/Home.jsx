import React from "react";
import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Style from "../Admin.module.css";

function Home() {
    return (
        <div className={Style.mainContent}>
            <div className={Style.header}>   
                <div className={Style.userInfo}>
                    <div className={Style.useralign}>
                        <div className={Style.activate}>
                            <FontAwesomeIcon icon={faCircleUser} className={Style.userIcon} />
                            <span></span>
                        </div>
                        <span className={Style.userText}>اهلا :<span> طارق الليثي</span></span>
                    </div>
                    <div className={Style.userDetails}>
                        <p className={Style.userEmail}>tarek.ellath@gmail.com</p>
                    </div>
                </div>
                <button className={Style.userCount}>الباقة السنوية / الشهرية</button>
            </div>

            {/* إضافة عنصر 3D من Spline */}
            <div className={Style.splineContainer}>
               <div className={Style.overlayText}>
                   <h2>مرحبًا بك في منصة التداول</h2>
                   <p>تحليل الأسواق المالية في الوقت الفعلي</p> 
               </div>
                <Spline scene="https://prod.spline.design/lu38la-6lQ-oKNld/scene.splinecode" />
            </div>
        </div> 
    );
}

export default Home;
