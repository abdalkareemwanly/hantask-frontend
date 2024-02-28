export const StepThreePostDeal = ({
  countries,
  cities,
  handleDataChange,
  state,
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
        value={state.countryId}
        onChange={(e) => handleDataChange("countryId", e.target.value)}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
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
        value={state.cityid}
        onChange={(e) => handleDataChange("cityid", e.target.value)}
        className="bg-gray-200 rounded-md px-2 py-4 border-none outline-none"
      >
        <option>choose a city </option>
        {cities &&
          cities.map((ele, i) => (
            <option key={i} value={ele.id}>
              {ele.service_city}
            </option>
          ))}
      </select>
    </div>
  );
};
