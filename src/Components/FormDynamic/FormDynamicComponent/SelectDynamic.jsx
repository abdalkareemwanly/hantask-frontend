import React from "react";
import { BiSolidChevronDown } from "react-icons/bi";

export default function SelectDynamic(props) {
  const FormSelect = props.FormSelect;
  const Label = props.Label;
  return (
    <div>
      {FormSelect.map((element, index) =>
        typeof element === "object" ? (
          <div className="w-full px-3 my-6 md:mb-0" key={index}>
            {Label === true ? (
              <label
                className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
                htmlFor={element.label}
              >
                {element.label}
              </label>
            ) : null}
            <div className="relative">
              <select
                className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
                id="grid-state"
              >
                {element.elements.map((ele, ind) => (
                  <option key={ind} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 primary-text">
                <BiSolidChevronDown />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full px-3 my-6 md:mb-0" key={index}>
            {Label === true ? (
              <label
                className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
                htmlFor={element}
              >
                {element}
              </label>
            ) : null}
            <div className="relative">
              <select
                className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
                id="grid-state"
              >
                <option key={index} value={element}>
                  {element}
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 primary-text">
                <BiSolidChevronDown />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
