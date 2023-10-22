import React from "react";

export default function InputDynamic(props) {
  const FormInput = props.FormInput;
  const Label = props.Label;
  return (
    <div>
      {FormInput[1].map((ele, index) => (
        <div className="w-full px-3 my-6 md:mb-0" key={index}>
          {Label === true ? (
            <label
              className="block uppercase tracking-wide primary-text text-xs font-bold mb-2 ms-1"
              htmlFor={ele}
            >
              {ele}
            </label>
          ) : null}
          <div className="relative">
            <input
              className="block scroll appearance-none w-full border border-gray-200 primary-text py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-background-color text-primary-text focus:border-gray-500"
              type={FormInput[0]}
              placeholder={ele}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
