import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";

function Questionare({
  next,
  previous,
  index,
  selectedOption,
  answers,
  handleOptionClick,
  questions,
  error,
  title,
  
}) {
  return (
    <>
      <h1>
        <FontAwesomeIcon icon={faHandshake} /> {title}
      </h1>
      <hr />
      <h2>
        {index + 1}. {questions[index]?.question || "جارٍ تحميل السؤال..."}
      </h2>
      <ul>
        {Object.keys(questions[index])
          .filter((key) => key.startsWith("option"))
          .map((key, i) => (
            <li
              key={i}
              className={selectedOption?.optionIndex === i + 1 ? "selected" : ""}
              onClick={() => {
                
                handleOptionClick({
                  optionIndex: i + 1,
                  answer: questions[index][key],
                  question: questions[index].question,
                });
              }}
            >
              {questions[index][key]}
            </li>
          ))}
      </ul>
      <p className={error ? "error" : ""}>
        {error ? "يرجى اختيار إجابة قبل المتابعة!" : ""}
      </p>
      <div className="pop">
        <button className="pop1" onClick={previous}>
          السابق
        </button>
        <button onClick={next}>التالي</button>
        <div className="index">
          <span className="top">{index + 1}</span> of{" "}
          <span className="top">{questions.length}</span> Questions
        </div>
      </div>
    </>
  );
}

export default Questionare;
