import { useState } from "react";

function TrainingOppointments() {
  const [inputsPerDay, setInputsPerDay] = useState({});
  const [marketName, setMarketName] = useState("");
  const [finalData, setFinalData] = useState([]);

  const weekDays = [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];

  const handleAddition = (day) => {
    const updatedDayInputs = inputsPerDay[day] || [];
    setInputsPerDay({
      ...inputsPerDay,
      [day]: [...updatedDayInputs, ""],
    });
  };

  const handleTimeChange = (day, index, value) => {
    const updatedDayInputs = inputsPerDay[day] || [];
    updatedDayInputs[index] = value;

    setInputsPerDay({
      ...inputsPerDay,
      [day]: [...updatedDayInputs],
    });
  };

  const handleSubmit = () => {
    const oppointments = Object.entries(inputsPerDay)
      .filter(([_, times]) => times.some((t) => t))
      .map(([day, times]) => ({
        day,
        times: times.filter((t) => t !== ""),
      }));

    const formattedData = [
      {
        marketName,
        oppointments,
      },
    ];

    setFinalData(formattedData);
    console.log("Final Data:", formattedData);
  };

  return (
    <div className="mt-5 w-full h-[100vh] flex justify-center">
      <div className="container flex flex-col">
        <h1 className="text-center text-primary-950 font-bold text-[25px]">
          اضافه المواعيد المتاحه لكل بورصه
        </h1>

        <div className="mb-4 mt-5">
          <label htmlFor="marketName"> اسم البورصه: </label>
          <input
            type="text"
            id="marketName"
            placeholder="ادخل اسم البورصه"
            value={marketName}
            className="w-[230px] rounded-xl shadow-sm"
            onChange={(e) => setMarketName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          {weekDays.map((day, idx) => (
            <div key={idx} className="flex flex-col">
              <h4 className="text-[18px] mb-1">{day}</h4>
              <div className="flex gap-3 items-center flex-wrap">
                {(inputsPerDay[day] || []).map((time, inputIdx) => (
                  <input
                    key={inputIdx}
                    type="time"
                    className="rounded-full w-[130px]"
                    value={time}
                    onChange={(e) =>
                      handleTimeChange(day, inputIdx, e.target.value)
                    }
                  />
                ))}

                <button
                  className="rounded-full px-3 py-1 bg-primary-800 font-semibold text-white shadow-sm transition-all hover:bg-gray-200"
                  onClick={() => handleAddition(day)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="px-7 py-2 mt-6 rounded-xl bg-accent-900 text-black font-semibold self-center"
        >
          ارسال
        </button>
      </div>
    </div>
  );
}

export default TrainingOppointments;
