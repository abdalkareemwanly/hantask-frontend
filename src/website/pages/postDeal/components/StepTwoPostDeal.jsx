import { useState } from "react";
import CustomSelectForManyUses from "../../../../Components/formComponents/CustomSelectForManyUses";

export const StepTwoPostDeal = ({
  subCategories,
  childCategories,
  goToNextStep,
  goToPrevStep,
  register,
  watch,
  errors,
  selectedOptions,
  setSelectedOptions,
  trigger,
  setValue,
}) => {
  console.log(watch("subcategory_id"), watch("child_category_id"));
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">What would you like to have done?</h2>
      <p className="text-gray-500">
        Detail your project on Hantask, and we'll connect you with skilled
        professional handymans.
      </p>
      <CustomSelectForManyUses
        errors={errors}
        isMultiple={false}
        optionText={"name"}
        optionValue={"id"}
        options={subCategories}
        nameOfField={"subcategory_id"}
        register={register}
        trigger={trigger}
        watch={watch}
        title={"sub category"}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setValue={setValue}
      />
      {errors["subcategory_id"] && errors["subcategory_id"].message}

      <CustomSelectForManyUses
        errors={errors}
        isMultiple={false}
        optionText={"name"}
        optionValue={"id"}
        title={"child category"}
        options={childCategories}
        nameOfField={"child_category_id"}
        register={register}
        trigger={trigger}
        watch={watch}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setValue={setValue}
      />
      {errors["child_category_id"] && errors["child_category_id"].message}

      <div className="flex gap-2">
        <div
          className="bg-orangeColor cursor-pointer text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["subcategory_id"]?.message ||
            watch("subcategory_id") === null ||
            watch("subcategory_id").length === 0 ||
            errors["child_category_id"]?.message ||
            watch("child_category_id") === null ||
            watch("child_category_id").length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } `}
          onClick={
            errors["subcategory_id"]?.message ||
            watch("subcategory_id") === null ||
            watch("subcategory_id").length === 0 ||
            errors["child_category_id"]?.message ||
            watch("child_category_id") === null ||
            watch("child_category_id").length === 0
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
