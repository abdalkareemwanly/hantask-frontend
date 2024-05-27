const StepFourPostDeal = ({
  goToNextStep,
  goToPrevStep,
  errors,
  register,
  watch,
}) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        ok lets now sets the budget and the deadline for this deal
      </h2>
      <p className="text-gray-500">
        please proivde a correct budget and a deadline so we can show it for
        handymans
      </p>
      <label htmlFor="budget" className="">
        enter your minumum budget price if you want
      </label>
      <input
        name="budget"
        id="budget"
        {...register("budget")}
        type="number"
        className="input-box w-full"
        placeholder="type your budget"
      />
      <span className="text-red-500">
        {errors["budget"] && errors["budget"].message}
      </span>

      <input
        type="date"
        name="deadline"
        {...register("deadline", { required: "This field is required" })}
        className="input-box w-full"
        placeholder="type your budget"
      />
      <span className="text-red-500">
        {errors["date"] && errors["date"].message}
      </span>

      <div className="flex gap-2">
        <div
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["deadline"]?.message || watch("deadline") === ""
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["deadline"]?.message || watch("deadline") === ""
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

export default StepFourPostDeal;
