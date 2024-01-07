import FilterItem from "./FilterItem";

function FilterContainer({ filter, setFilter, data }) {
  try {
    return (
      <>
        {Object.keys(filter).map((key, index) => {
          return <FilterItem key={index} itemKey={key} data={data[key]} filter={filter} setFilter={setFilter} />;
        })}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FilterContainer;
