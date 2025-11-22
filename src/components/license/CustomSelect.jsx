
import { useState } from "react";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "اختر...",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (disabled) return; // منع الاختيار
    onChange(option);
    setIsOpen(false);

  };

  const toggleOpen = () => {
    if (disabled) return; // منع الفتح
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={`w-full p-3 border rounded-lg text-right bg-white
         ${disabled ? "bg-gray-200 cursor-not-allowed text-gray-500" : ""}
        `}
      >
        {value || placeholder}
      </button>

      {isOpen && !disabled && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer p-3 hover:bg-green-100 
                ${option === value ? "bg-green-600 text-white" : ""}
              `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

