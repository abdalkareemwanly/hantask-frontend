const StepFourPostDeal = ({ watch, setValue, goToNextStep, goToPrevStep }) => {
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
        name="budget"
        onChange={(e) => setValue("budget", e.target.value)}
        value={watch("budget")}
        type="number"
        className="input-box w-full"
        placeholder="type your budget"
      />
      <input
        type="date"
        name="deadline"
        onChange={(e) => setValue("deadline", e.target.value)}
        value={watch("deadline")}
        className="input-box w-full"
        placeholder="type your budget"
      />
      <div className="flex gap-2">
        <div
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        <div
          className="bg-greenColor text-white  p-2 rounded-lg"
          onClick={goToNextStep}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default StepFourPostDeal;
