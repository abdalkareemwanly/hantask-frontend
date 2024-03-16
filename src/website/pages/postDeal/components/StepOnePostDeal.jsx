import { useState } from "react";

export const StepOnePostDeal = ({
  categories,
  handleDataChange,
  state,
  setSelectedCategory,
  goToNextStep,
  getQuestionsById,
  register,
  setValue,
}) => {
  const handleChange = (e) => {
    getQuestionsById({
      category_id: e.target.value,
      subcategory_id: null,
      child_category_id: null,
    });
    setSelectedCategory({ id: e.target.value });
    handleDataChange("categoryId", e.target.value);
    setValue("category_id", e.target.value);
  };

  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        onChange={handleChange}
        name="category_id" // Ensure the name attribute matches the registered field name
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option value={""}>choose a category first</option>
        {categories &&
          categories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      {/* <span>{isError && "this field required"}</span> */}
      <div>
        <div
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
        >
          next
        </div>
      </div>
    </div>
  );
};
