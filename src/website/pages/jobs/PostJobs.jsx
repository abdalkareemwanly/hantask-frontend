import { useState } from "react";
import PostJobsCard from "./components/PostJobsCard";
import "./style/PostJobs.css";
import FILTER_DATA from "./data/FilterData";
import FilterContainer from "../../components/filter/FilterContainer";
import DEFAULT_DATA from "./data/defaultData";

function PostJobs(props) {
  try {
    const [filter, setFilter] = useState({
      country: "",
      city: "",
      search: "",
      category: "",
      subcategory: "",
      childcategory: "",
      price: "",
      match: "",
    });
    return (
      <>
        <div className=" sm:px-12 px-2 py-24 flex flex-col gap-12 text-center  justify-center items-center">
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold">Jobs</h2>
            <div className="jobs-container">
              <div className="jobs-filter grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <FilterContainer filter={filter} setFilter={setFilter} data={FILTER_DATA} />
              </div>
              <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {DEFAULT_DATA.map((item, index) => {
                  return <PostJobsCard key={index} item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PostJobs;
