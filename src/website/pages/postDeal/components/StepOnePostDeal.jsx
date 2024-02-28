export const StepOnePostDeal = ({ categories, handleDataChange, state }) => {
  console.log(state);
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        value={state?.categoryId}
        onChange={(e) => handleDataChange("categoryId", e.target.value)}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option>choose a category first</option>
        {categories &&
          categories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
    </div>
  );
};
