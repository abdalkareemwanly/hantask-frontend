import { useState } from "react";

export const StepTwoPostDeal = ({
  subCategories,
  childCategories,
  handleDataChange,
  goToNextStep,
  goToPrevStep,
  setSelectedSubCategory,
  getQuestionsById,
  register,
  setValue,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    handleDataChange(name, value);
    if (name === "subcategory_id") {
      getQuestionsById({
        category_id: null,
        subcategory_id: value,
        child_category_id: null,
      });
    } else if (name === "child_category_id") {
      getQuestionsById({
        category_id: null,
        subcategory_id: null,
        child_category_id: value,
      });
    }
    setValue(name, value);
  };

  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        name="subcategory_id"
        onChange={(e) => {
          setSelectedSubCategory({ id: e.target.value });
          handleChange(e);
        }}
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
      {/* <span>{errors?.subCategoryId && "this field required"}</span> */}

      <select
        name="child_category_id"
        onChange={handleChange}
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
      {/* <span>{errors?.childCategoryId && "this field required"}</span> */}

      <div className="flex gap-2">
        <button
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
          // disabled={Object.values(errors).length == 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};
