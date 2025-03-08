import React from "react";
import { useParams } from "react-router-dom";
import styles from "./BookDetails.module.css";
import bookCover from "../../../assets/imgs/book2.jpeg";

const books = [
  { 
    id: 0,
    title: "كتاب قوة التفكير الايجابي ",
    author: "د . نورمان فنسنت بيل",
    price: "$123.20",
    oldPrice: "$160.00",
    availability: "متوفر",
    company: "STOCK SQUARES",
    type: "Book",
    img: bookCover,
    rating: 5,
  }
];

export default function BookDetails() {
  const { id } = useParams();
  const book = books[id];

  if (!book) {
    return <h2 className={styles.notFound}>لم يتم العثور على الكتاب!</h2>;
  }

  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.bookInfo}>
        <h2 className={styles.bookTitle}>{book.title}</h2>
        <p className={styles.author}>كتابة: {book.author}</p>
        <div className={styles.rating}>
          {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
        </div>
        <div className={styles.bookcontain}>
        <p><strong>الشركة :</strong> {book.company}</p>
        <p><strong>النوع : </strong> {book.type}</p>
        <p><strong>حالة المنتج :</strong> {book.availability}</p>
        <p className={styles.price}>
          <span className={styles.currentPrice}>{book.price}</span>
          <span className={styles.oldPrice}>{book.oldPrice}</span>
        </p>
        <div className={styles.actions}>
          <button className={styles.addToCart}> إتمام الشراء</button>
        </div>
      </div>
      </div>

      <div className={styles.bookImageContainer}>
        <img src={book.img} alt={book.title} className={styles.bookImage} />
      </div>
    </div>
  );
}
