import { useState } from "react";
import CustomSelectForManyUses from "../../../../Components/formComponents/CustomSelectForManyUses";

export const StepOnePostDeal = ({
  categories,
  goToNextStep,
  register,
  watch,
  errors,
  selectedOptions,
  setSelectedOptions,
  trigger,
  setValue,
}) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <CustomSelectForManyUses
        errors={errors}
        isMultiple={false}
        title={"main category"}
        optionText={"name"}
        optionValue={"id"}
        options={categories}
        nameOfField={"category_id"}
        register={register}
        trigger={trigger}
        watch={watch}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setValue={setValue}
      />
      <div className="flex">
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["category_id"]?.message || watch("category_id").length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["category_id"]?.message || watch("category_id").length === 0
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
