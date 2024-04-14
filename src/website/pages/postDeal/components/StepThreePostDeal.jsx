import CustomSelectForManyUses from "../../../../Components/formComponents/CustomSelectForManyUses";

export const StepThreePostDeal = ({
  countries,
  cities,
  watch,
  setValue,
  goToNextStep,
  goToPrevStep,
  errors,
  register,
  selectedOptions,
  setSelectedOptions,
  trigger,
}) => {
  return (
    <div className="max-w-[620px] flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        where is the location of your deal to be done?
      </h2>
      <p className="text-gray-500">
        lets choose the country and the city where you want your service to be
        done
      </p>

      <CustomSelectForManyUses
        errors={errors}
        isMultiple={false}
        title={"select a country"}
        optionText={"country"}
        optionValue={"id"}
        options={countries}
        nameOfField={"country_id"}
        register={register}
        trigger={trigger}
        watch={watch}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setValue={setValue}
      />

      <CustomSelectForManyUses
        errors={errors}
        isMultiple={false}
        title={"select a city"}
        optionText={"service_city"}
        optionValue={"id"}
        options={cities}
        nameOfField={"city_id"}
        register={register}
        trigger={trigger}
        watch={watch}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setValue={setValue}
      />
      <div className="flex flex-1 flex-col gap-2 w-full">
        <input
          name="lineAddress"
          {...register("lineAddress", { required: "This field is required" })}
          placeholder="add your line address"
          type="text"
          className="input-box w-full"
        />
        {errors["lineAddress"] && errors["lineAddress"].message}
      </div>
      <div className="flex gap-2">
        <div
          className="bg-orangeColor text-white  p-2 rounded-lg"
          onClick={goToPrevStep}
        >
          Previous
        </div>
        <div
          className={`bg-greenColor text-white  p-2 rounded-lg ${
            errors["country_id"]?.message ||
            watch("country_id") === "" ||
            errors["city_id"]?.message ||
            watch("country_id").length === 0 ||
            watch("city_id").length === 0 ||
            errors["lineAddress"]?.message ||
            watch("lineAddress") === "" ||
            watch("city_id") === ""
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }  `}
          onClick={
            errors["country_id"]?.message ||
            watch("country_id") === "" ||
            watch("country_id").length === 0 ||
            watch("city_id").length === 0 ||
            errors["city_id"]?.message ||
            errors["lineAddress"]?.message ||
            watch("lineAddress") === "" ||
            watch("city_id") === ""
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
