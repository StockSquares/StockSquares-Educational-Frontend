import {
  faArrowCircleDown,
  faBasketShopping,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Modal } from "../../components";
import image from "../../assets/imgs/investor.jpg";
import lib1 from "../../assets/imgs/lib1.jfif";
import lib2 from "../../assets/imgs/lib2.jfif";
import lib3 from "../../assets/imgs/lib3.jpg";

export default function FinanceAndBusinessLibrary() {
  const navigate = useNavigate();
  const [open, setIsOpen] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredData, setFilteredData] = useState(allBooks);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBook, setSelectedBook] = useState();

  useEffect(() => {
    fetch("https://stocksquare1.runasp.net/api/Book/GetAllBooks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAllBooks(data.data);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    let filtered = [];
    if (selectedCategory !== "all") {
      filtered = allBooks.filter((b) => b.bookCategory === selectedCategory);
    } else {
      filtered = allBooks;
    }
    setFilteredData(filtered);
  }, [selectedCategory, allBooks]);

  const sliderImages = [
    {
      img: lib1,
      text: "احصل على نسخ أصلية من أفضل كتب المال والأعمال",
    },
    {
      img: lib2,
      text: "ابدأ رحلتك الاستثمارية مع مكتبة Stock Square",
    },
    {
      img: lib3,
      text: "طور معرفتك المالية مع كتب رقمية إبداعية",
    },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      {open && (
        <Modal onClose={() => setIsOpen(false)}>
          <h1 className="text-xl py-1 px-4 font-[650] border-b border-b-gray-300 pb-2">
            {" "}
            تفاصيل الكتاب{" "}
          </h1>
          <div className="flex gap-5 p-4 max-w-[800px] m-auto">
            {/* الصورة */}

            <div className="w-1/3">
              <img
                src={image}
                alt={selectedBook?.bookName}
                className="w-full h-full object-cover rounded-lg shadow"
              />
            </div>

            {/* البيانات */}
            <div className="w-2/3 flex flex-col justify-between">
              {/* الاسم */}
              <h2 className="text-xl font-bold mb-2">
                {selectedBook?.bookName}
              </h2>

              {/* الوصف */}
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                {selectedBook?.bookDescription}
              </div>

              {/* السعر */}
              <p className="text-lg font-semibold mb-4">
                السعر: {selectedBook?.bookPrice} ج.م
              </p>

              {/* الزرار */}
              <button className="bg-primary-500 px-5 py-1 rounded-lg transition-all border-2 border-primary-300 hover:bg-primary-100 ">
                {" "}
                اضافه الي العربه{" "}
                <FontAwesomeIcon icon={faBasketShopping} className="mx-1" />
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="w-full min-h-[80vh] mt-6">
        <div className="fixed  p-1">
          <span className="bg-primary-600 absolute left-0 px-2 top-0 rounded-full">
            0
          </span>
          <FontAwesomeIcon
            icon={faBasketShopping}
            onClick={() => navigate(ROUTES.CART)}
            className="text-2xl ms-2 border-2 rounded-full px-3 py-3 "
          />
        </div>
        {/* <div className="fixed mt-16 p-1">
        <span className="bg-red-400 absolute left-0 px-2 top-0 rounded-full">
          0
        </span>
        <FontAwesomeIcon
          icon={faHeart}
          className="text-2xl ms-2 border-2 rounded-full px-3 py-3 "
        />
      </div> */}
        <div className="container m-auto flex flex-col gap-5">

          <div className="relative w-full h-[32vh] rounded-lg overflow-hidden shadow-lg">
            {/* الصورة */}
            <img
              src={sliderImages[index].img}
              className="w-full h-full object-cover transition-all duration-700"
            />

            {/* الـ Overlay */}
            <div key={index} className="absolute animate-slideFade  right-5 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-lg w-[500px]">
              <h2 className="text-lg font-bold leading-relaxed">
                {sliderImages[index].text}
              </h2>
              <button className="mt-3 text-primary-500 text-2xl border-2 px-1 shadow-sm animate-pulse rounded-full  transition">
               <FontAwesomeIcon icon={faArrowCircleDown}/>
              </button>
            </div>
            
          </div>

          <div className="flex flex-col items-start gap-2 mb-2 min-h-[35px]">
            <p className="font-semibold "> التصنيف عبر: </p>
            <ul className="flex gap-2 items-center  *:cursor-pointer *:border-2 *:border-primary-400 *:rounded-lg *:p-1">
              <li
                className={` ${
                  selectedCategory === "all"
                    ? "bg-primary-400 transition-all "
                    : "bg-gray-50"
                } `}
                onClick={() => setSelectedCategory("all")}
              >
                {" "}
                الكل{" "}
              </li>
              <li className="bg-gray-50"> الأكثر شراء </li>
              <li
                className={` ${
                  selectedCategory === "physical_Copy"
                    ? "bg-primary-400 transition-all "
                    : "bg-gray-50"
                } `}
                onClick={() => setSelectedCategory("physical_Copy")}
              >
                {" "}
                نسخه مادية أصليه{" "}
              </li>
              <li
                className={` ${
                  selectedCategory === "digital_Copy"
                    ? "bg-primary-400 transition-all "
                    : "bg-gray-50"
                } `}
                onClick={() => setSelectedCategory("digital_Copy")}
              >
                {" "}
                نسخه رقمية ابداعيه{" "}
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {filteredData.length > 0 ? (
              filteredData.map((book) => (
                <div
                  className="bookCard flex flex-col justify-between bg-gray-50 h-[30vh]"
                  key={book.id}
                >
                  <div className="bg-primary-500 overflow-hidden relative h-[60%]">
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className="absolute bottom-0 right-0 text-primary-100 text-2xl cursor-pointer hover:scale-110"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedBook(book);
                      }}
                    />
                    <span className="absolute top-0 left-0 px-2 py-0.5 rounded-br-lg bg-primary-300">
                      {book.bookCategory === "physical_Copy"
                        ? "نسخه ماديه أصليه"
                        : "نسخه رقميه ابداعيه"}
                    </span>
                    <img src={image} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2">
                    <p> السعر: {book.bookPrice} ج.م</p>{" "}
                  </div>
                  <div className="flex items-center mb-1 p-2">
                    <button className="bg-primary-500 px-5 py-1 rounded-lg transition-all border-2 border-primary-300 hover:bg-primary-100 ">
                      {" "}
                      اضافه الي العربه{" "}
                      <FontAwesomeIcon
                        icon={faBasketShopping}
                        className="mx-1"
                      />
                    </button>
                    {/* <FontAwesomeIcon icon={faHeart} size="lg" /> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-black w-full text-lg ">
                {" "}
                No Books Added{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
