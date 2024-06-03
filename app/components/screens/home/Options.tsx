import { useActions } from "@/app/hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelecor";
import { optionsList } from "./data";
import cn from "classnames";
import Image from "next/image";
const Options = () => {
  const { selectedOption, travelTime } = useTypedSelector(
    (state) => state.taxi
  );
  const { setSelectedOption } = useActions();
  console.log(selectedOption);
  return (
    <div className="flex overflow-x-scroll hide-scroll-bar my-5 ">
      <div className="flex flex-nowrap">
        {optionsList.map((option) => (
          <button
            style={{ minWidth: 105 }}
            key={option._id}
            className="inline-block rounded-xl py-2 px-4 outline-none mr-4 bg-white overflow-hidden"
            onClick={() => setSelectedOption(option._id)}>
            <div
              className={` text-left transition-opacity duration-300 ease-in-out ${
                selectedOption == option._id ? "opacity-110" : "opacity-40"
              }`}>
              <Image
                src={option.img}
                alt={option.title}
                width={50}
                height={50}
              />
              <div className="text-sm -m-1 text-black">{option.title}</div>
              <div className="text-md font-medium text-black">
                {travelTime
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(travelTime * option.multiplier)
                  : "- $"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Options;
