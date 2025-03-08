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
    <div>
      <div className="bg-lightgray h-[30vh] flex-center">
        <form className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <TextInput
              id="search"
              type="text"
              icon={search}
              className="input-parent grow mb-2 md:mb-0 me-0 md:me-4"
              placeholder={t("common.search")}
            />
            <Button btnText={t("common.search")} bgColor="primary" px="px-8" />
          </div>
        </form>
      </div>

      <div className="container">
        <div className="flex justify-between items-start">
          <div className="md:w-3/5 lg:w-3/4 p-4">
            <Tabs
              aria-label="Pills"
              variant="pills"
              className="flex-center"
              onActiveTabChange={handleAisle}
            >
              <Tabs.Item active title={t("bookstore.tabs.popular")}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg bg-white p-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="w-full">
                      <EcommerceCard
                        productImg="src/assets/imgs/bookstore/book-bg.jpg"
                        productName="الاسثتمار والاعمال"
                        price="500 EGP"
                        rating="3.5"
                      />
                    </div>
                  ))}
                </div>
              </Tabs.Item>

              <Tabs.Item title={t("bookstore.tabs.recent")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.recent")}
                </p>
              </Tabs.Item>

              <Tabs.Item title={t("bookstore.tabs.economy")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.economy")}
                </p>
              </Tabs.Item>

              <Tabs.Item title={t("bookstore.tabs.stockMarket")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.stockMarket")}
                </p>
              </Tabs.Item>

              <Tabs.Item title={t("bookstore.tabs.finance")}>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t("bookstore.content.finance")}
                </p>
              </Tabs.Item>
            </Tabs>
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
