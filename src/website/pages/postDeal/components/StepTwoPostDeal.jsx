import { useState } from "react";

export const StepTwoPostDeal = ({
  subCategories,
  childCategories,
  handleDataChange,
  state,
  goToNextStep,
  goToPrevStep,
  setSelectedSubCategory,
}) => {
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === null || value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        [name]: "this field is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
    handleDataChange(name, value);
  };

  const check = () => {
    // if (
    //   state?.subCategoryId.length === 0 ||
    //   state.childCategoryId.length === 0
    // ) {
    //   if (state?.subCategoryId.length === 0) {
    //     setErrors((prev) => ({
    //       ...prev,
    //       subCategoryId: "this field is required",
    //     }));
    //   } else {
    //     setErrors((prev) => ({
    //       ...prev,
    //       subCategoryId: null,
    //     }));
    //   }
    //   if (state.childCategoryId.length === 0) {
    //     setErrors((prev) => ({
    //       ...prev,
    //       childCategoryId: "this field is required",
    //     }));
    //   } else {
    //     setErrors((prev) => ({
    //       ...prev,
    //       childCategoryId: null,
    //     }));
    //   }
    // } else {
    goToNextStep();
    // }
  };

  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        value={state.subCategoryId}
        name="subCategoryId"
        onChange={(e) => {
          setSelectedSubCategory({ id: e.target.value });
          handleChange(e);
        }}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option value="">choose a sub category </option>
        {subCategories &&
          subCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      <span>{errors?.subCategoryId && "this field required"}</span>

      <select
        value={state.childCategoryId}
        name="childCategoryId"
        onChange={handleChange}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option value="">choose a child category </option>
        {childCategories &&
          childCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      <span>{errors?.childCategoryId && "this field required"}</span>

      <div>
        <button
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </button>
        <button
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={check}
          // disabled={Object.values(errors).length == 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};
