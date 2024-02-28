export const StepTwoPostDeal = ({
  subCategories,
  childCategories,
  handleDataChange,
  state,
}) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <select
        value={state.subCategoryId}
        onChange={(e) => handleDataChange("subCategoryId", e.target.value)}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option>choose a sub category </option>
        {subCategories &&
          subCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
      <select
        value={state.childCategoryId}
        onChange={(e) => handleDataChange("childCategoryId", e.target.value)}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option>choose a child category </option>
        {childCategories &&
          childCategories.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.name}
            </option>
          ))}
      </select>
    </div>
  );
};
