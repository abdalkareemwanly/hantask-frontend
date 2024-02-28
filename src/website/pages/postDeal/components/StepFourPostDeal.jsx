const StepFourPostDeal = ({ handleDataChange, state }) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        ok lets now sets the budget and the deadline for this deal
      </h2>
      <p className="text-gray-500">
        please proivde a correct budget and a deadline so we can show it for
        handymans
      </p>
      <input
        onChange={(e) => handleDataChange("budget", e.target.value)}
        value={state.budget}
        type="number"
        className="bg-gray-200 rounded-md px-4 py-4 border-none outline-none"
        placeholder="type your budget"
      />
      <input
        type="date"
        onChange={(e) => handleDataChange("deadline", e.target.value)}
        value={state.deadline}
        className="bg-gray-200 rounded-md px-4 py-4 border-none outline-none"
        placeholder="type your budget"
      />
    </div>
  );
};

export default StepFourPostDeal;
