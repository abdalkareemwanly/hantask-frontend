import { useState } from "react";

export const StepOnePostDeal = ({
  categories,
  handleDataChange,
  state,
  setSelectedCategory,
  goToNextStep,
}) => {
  const [isError, setIsError] = useState(false);
  const handleChange = (e) => {
    setSelectedCategory({ id: e.target.value });
    if (e.target.value.length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    handleDataChange("categoryId", e.target.value);
  };
  const check = () => {
    if (state?.categoryId.length === 0) {
      setIsError(true);
    } else {
      goToNextStep();
      setIsError(false);
    }
  };
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        value={state?.categoryId}
        onChange={handleChange}
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
      <span>{isError && "this field required"}</span>
      <div>
        <button
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={check}
          disabled={isError}
        >
          next
        </button>
      </div>
    </div>
  );
};
