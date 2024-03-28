export const StepThreePostDeal = ({
  countries,
  cities,
  watch,
  setValue,
  goToNextStep,
  goToPrevStep,
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
      <select
        name="country_id"
        onChange={(e) => setValue("country_id", e.target.value)}
        value={watch("country_id")}
        className="input-box w-full"
      >
        <option>choose a country first </option>
        {countries &&
          countries.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.country}
            </option>
          ))}
      </select>
      <select
        name="city_id"
        onChange={(e) => setValue("city_id", e.target.value)}
        value={watch("city_id")}
        className="input-box w-full"
      >
        <option>choose a city </option>
        {cities &&
          cities.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.service_city}
            </option>
          ))}
      </select>
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
