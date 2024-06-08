import { TransactionContext } from "@/context/TransactionProvider";
import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown = ({ options, defaultText, selectID, zIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState({
    label: defaultText,
  });

  const { selectMarketFilter, setMarketFilter } =
    useContext(TransactionContext);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setMarketFilter((selectMarketFilter) => ({
      ...selectMarketFilter,
      [selectID]: option.label,
    }));
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     const menu = document.getElementById(selectID);
  //     if (menu && !menu.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative lg:text-xs text-[9px] lg:my-6 my-2 lg:w-60 w-28">
      <button
        id={selectID}
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center text-foreground appearance-none w-full optionBG border lg:py-2 py-1 lg:px-4 px-2 text-start rounded leading-tight focus:outline-none focus:border-gray-500"
      >
        <p>{selectedOption.label}</p>
        <MdKeyboardArrowDown className="my-auto lg:text-xl text-lg" />
      </button>
      {isOpen && (
        <div
          className={`absolute z-${zIndex} bg-background w-full mt-1 optionBG border rounded shadow`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onMouseDown={() => {
                handleSelect(option);
              }}
              className={`lg:px-4 px-1 lg:py-2 py-1 bg-[#010F16] border border-transparent text-white cursor-pointer hover:bg-primary hover:text-background`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
