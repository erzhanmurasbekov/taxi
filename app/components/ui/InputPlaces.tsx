import { FC, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import cn from "classnames";
import { Coords } from "google-map-react";
import { useTypedSelector } from "@/app/hooks/useTypedSelecor";

interface IInputPlaces {
  cbSuccess: (address: string, location: Coords) => void;
  type: "from" | "to";
}

const InputPlaces: FC<IInputPlaces> = ({ cbSuccess, type }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setFocus = () => inputRef?.current?.focus();

  const [address, setAddress] = useState("");
  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((result) => getLatLng(result[0]))
      .then((location) => {
        cbSuccess(address, location);
        setAddress(address);
      })
      .catch((err) => console.error("error", err));
  };
  const isFrom = type === "from";
  useEffect(() => {
    if (isFrom) setFocus();
  }, []);

  const { travelTime } = useTypedSelector((state) => state.taxi);

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      onError={(err) => console.log("error " + err)}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div
          className={cn(
            " relative -bottom-12 xl:bottom-0 xl:h-max md:h-max shadow-lg",
            {
              "mb-1 xl:mb-5": isFrom,
            }
          )}>
          <div
            className="xl:py-4 py-1 px-5 bg-white rounded-lg flex items-center"
            style={
              suggestions.length
                ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                : {}
            }
            onClick={setFocus}>
            <FiSearch
              color={isFrom ? "#ffbc00" : "#615F5D"}
              className="mr-3"
              size={26}
            />
            <input
              {...getInputProps({
                ref: inputRef,
                placeholder: isFrom ? "Where from?" : "Where to?",
                className: "outline-none w-[70%] text-gray-800",
              })}
            />
            {!isFrom && (
              <div className="absolute right-5 text-sm text-gray-400">
                {travelTime
                  ? /* `${travelTime} min. (${Math.ceil(travelTime / 60)} h.)` */
                    travelTime < 60
                    ? `${travelTime} min`
                    : `${Math.floor(travelTime / 60)}h ${travelTime % 60}min`
                  : `- min`}{" "}
              </div>
            )}
          </div>
          <div
            className={cn(
              "absolute w-full h-0 overflow-y-auto rounded-b-lg z-10",
              {
                "h-48": suggestions.length || loading,
              }
            )}>
            {loading && <div className="p-2 bg-white">Loading...</div>}
            {suggestions.map((suggestion, idx) => (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className: cn("cursor-pointer p-3", {
                    "bg-gray-100": suggestion.active,
                    "bg-white": !suggestion.active,
                  }),
                })}
                key={`loc ${idx}`}>
                <span className="text-black">{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default InputPlaces;
