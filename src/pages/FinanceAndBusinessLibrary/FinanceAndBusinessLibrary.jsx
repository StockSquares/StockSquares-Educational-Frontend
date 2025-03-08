import React, { useState } from "react"; // ✅ استيراد useState بشكل صحيح
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
import book from "../../assets/imgs/book1.jpg";
import book2 from "../../assets/imgs/book2.jpeg";
import bgphoto from "../../assets/imgs/bookstore/2797560.jpg";
import BookDetails from './multipages/BookDetails';

export default function BookSlider() {
  const [filter, setFilter] = useState("all"); 

  const books = [
    {img: book},
    {img: book},
    {img: book},
    {img: book},
    {img: book},
  ];

  const books2 = [
    { title: "كتاب إلكتروني 1", price: "150 EGP", img: book2, type: "ebook" },
    { title: "كتاب مطبوع 1", price: "200 EGP", img: book2,  type: "local" },
    { title: "كتاب إلكتروني 2", price: "180 EGP", img: book2, type: "ebook" },
    { title: "كتاب مطبوع 2", price: "220 EGP", img: book2,  type: "local" },
    { title: "كتاب إلكتروني 3", price: "220 EGP", img: book2, type: "ebook" }
  ];

  const filteredBooks = filter === "all" ? books2 : books2.filter(book => book.type === filter);

  const slides = [slide1, slide2, slide3];

  return (
    <div className="relative w-full mx-auto">
      <Routes>
        <Route path="/bookdetails/:id" element={<BookDetails />} />
      </Routes>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className={styles.customSwiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[500px] flex justify-center items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="text-white text-center z-10">
                <h2 className={styles.slideh1}>مرحبا بك في مكتبة المال والأعمال</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={styles.bookshelfContainer}
        style={{
          backgroundImage: `url(${bgphoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className={styles.sectionTitle}>افضل الكتب مبيعا </h2>
        <div className={styles.shelf}>
          {books.map((book, index) => (
            <AnimatedBook key={index} book={book.img} index={index} />
          ))}
        </div>
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


        <div className={styles.featuredGrid}>
          {filteredBooks.map((book, index) => (
            <div key={index} className={styles.featuredItem}>
              <img src={book.img} alt={book.title} className={styles.featuredImage} />
              <hr className={styles.separator} />
              <h3 className={styles.featuredTitle}>{book.title}</h3>
              <p className={styles.featuredPrice}>{book.price}</p>
              <button className={styles.buyButton}>
                <Link to={`/bookdetails/${index}`} style={{ textDecoration: "none", color: "white" }}>
                  شراء الآن
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
const AnimatedBook = ({ book, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={styles.bookItem}
      initial={{ opacity: 0, y: 100, rotateY: 90 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      }}
    >
     <img src={book} alt={`Book ${index + 1}`} className={styles[`bookImage${index + 1}`]} />
    </motion.div>
  );
};  
