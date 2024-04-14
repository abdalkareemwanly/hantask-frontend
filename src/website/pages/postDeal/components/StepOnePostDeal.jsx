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

      <p className="text-gray-500">
        lets type our deal title with it's description
      </p>
      <div className="flex items-start  gap-2 w-full  ">
        <div className="flex flex-1 flex-col gap-2">
          <input
            name="title"
            {...register("title", { required: "This field is required" })}
            placeholder="deal title"
            type="text"
            className="input-box w-[350px]"
          />
          {errors["title"] && errors["title"].message}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <textarea
            name="description"
            {...register("description", { required: "This field is required" })}
            placeholder="deal description"
            type="text"
            className="input-box w-[350px]"
          />
          {errors["description"] && errors["description"].message}
        </div>
      </div>
      <p className="text-gray-500">let's now identify your deal</p>
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
            errors["category_id"]?.message ||
            watch("category_id").length === 0 ||
            errors["title"]?.message ||
            watch("title") === "" ||
            errors["description"]?.message ||
            watch("description") === ""
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["category_id"]?.message ||
            watch("category_id").length === 0 ||
            errors["title"]?.message ||
            watch("title") === "" ||
            errors["description"]?.message ||
            watch("description") === ""
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
