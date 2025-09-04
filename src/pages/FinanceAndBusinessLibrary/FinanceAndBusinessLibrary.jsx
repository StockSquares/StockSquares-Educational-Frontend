import React, { useState , useEffect } from "react"; 
import * as signalR from "@microsoft/signalr"; // استيراد SignalR
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./FinanceAndBusinessLibrary.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Routes, Route, Link } from "react-router-dom";
import slide1 from "../../assets/imgs/bgwhite.jpg";
import slide2 from "../../assets/imgs/bgwhite.jpg";
import slide3 from "../../assets/imgs/bgwhite.jpg";
import booksss from "../../assets/imgs/book1.jpg";
import bgphoto from "../../assets/imgs/bookstore/2797560.jpg";
import BookDetails from './multipages/BookDetails';
import { bookFront } from "../../assets";

export default function FinanceAndBusinessLibrary() {
  const [filter, setFilter] = useState("all"); 
  const [books, setBooks] = useState([]);
  const filteredBooks =
  filter === "all" ? books : books.filter((book) => book.type === filter);


  const slides = [slide1, slide2, slide3];
 

  useEffect(() => {
    const query = new URLSearchParams({}).toString();
  
    fetch(`https://stocksquare1.runasp.net/api/Book/GetAllBooks?${query}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("بيانات الكتب:", data);
        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          console.error("البيانات غير متوافقة:", data);
        }
      })
      .catch((error) => console.error("خطأ في جلب البيانات:", error));
  }, []);
  


  return (
    <div className="relative w-full mx-auto">
      <Routes>
      <Route path="/bookdetails/:id" element={<BookDetails />} />
      </Routes>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className={styles.customSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[350px] flex justify-center items-center bg-cover bg-center w-9/12 ml-auto mr-auto mt-14"
              style={{ backgroundImage: `url(${slide})` }}>
              <div className="absolute inset-0 bg-black/30"></div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.sec2}>
        <h2>سارع بالشراء الان</h2>
        <p>خصومات تصل الي  <span>%90</span></p>
      </div>


      <div className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>منتجات مميزة</h2>

      <div className={styles.filtersContainer}>
        <label htmlFor="bookFilter" className={styles.filterLabel}>  تصفية الكتب :  </label>
           <select id="bookFilter" onChange={(e) => setFilter(e.target.value)} value={filter} className={styles.filterSelect}>
              <option value="all">كل الكتب</option>
              <option value="ebook">كتب إلكترونية</option>
              <option value="local">كتب مطبوعة</option>
           </select>
      </div>

      {filteredBooks.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد كتب متاحة حاليا</p>
        ) : (
        <div className={styles.featuredGrid}>
        {filteredBooks.map((book, index) => (
          <div key={index} className={styles.featuredItem}>
            <img
              // src={`data:image/jpeg;base64,${book.bookPhoto}`}
              src={booksss}
              alt={book.bookName}
              className={styles.featuredImage}
            />
            <hr className={styles.separator} />
            <h3 className={styles.featuredTitle}>{book.bookName}</h3>
            <p className={styles.featuredPrice}>{book.bookPrice} EGP</p>
            <button className={styles.buyButton}>
              <Link to={`/bookdetails/${book.id}`} style={{ textDecoration: "none", color: "white" }}>
                شراء الآن
              </Link>
            </button>
          </div>
        ))}

        </div>
          )}
      </div>
    </div>
  );
}
