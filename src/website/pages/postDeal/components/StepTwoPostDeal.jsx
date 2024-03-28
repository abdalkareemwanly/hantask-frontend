import { useState } from "react";

export const StepTwoPostDeal = ({
  subCategories,
  childCategories,
  goToNextStep,
  goToPrevStep,
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
        {...register("subcategory_id", { required: "This field is required" })}
        className="input-box w-full"
      >
        <option value="">choose a sub category </option>
        {subCategories &&
          subCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      {errors["subcategory_id"] && errors["subcategory_id"].message}

      <select
        {...register("child_category_id", {
          required: "This field is required",
        })}
        className="input-box w-full"
      >
        <option value="">choose a child category </option>
        {childCategories &&
          childCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      {errors["child_category_id"] && errors["child_category_id"].message}

      <div className="flex gap-2">
        <button
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </button>
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["subcategory_id"]?.message ||
            watch("subcategory_id") === null ||
            errors["child_category_id"]?.message ||
            watch("child_category_id") === null
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["subcategory_id"]?.message ||
            watch("subcategory_id") === null ||
            errors["child_category_id"]?.message ||
            watch("child_category_id") === null
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
