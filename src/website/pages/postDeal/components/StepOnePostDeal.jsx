import { useState } from "react";

export const StepOnePostDeal = ({
  categories,
  goToNextStep,
  register,
  watch,
  errors,
}) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        {...register("category_id", { required: "This field is required" })}
        className="input-box w-full"
      >
        <option value={""}>choose a category first</option>
        {categories &&
          categories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      {errors["category_id"] && errors["category_id"].message}
      {/* <span>{isError && "this field required"}</span> */}
      <div className="flex">
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["category_id"]?.message || watch("category_id") === null
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["category_id"]?.message || watch("category_id") === null
              ? null
              : goToNextStep
          }
        >
          next
        </div>
      </div>
    </div>
  );
};
