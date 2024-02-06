import { useEffect, useState } from "react";
import PostJobsCard from "./components/PostJobsCard";
import "./style/PostJobs.css";
import FilterContainer from "../../components/filter/FilterContainer";
import DEFAULT_DATA from "./data/defaultData";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import PostJobsCardLoader from "./components/PostJobsCardLoader";
import { ThreeDots } from "react-loader-spinner";
import WebsiteLoader from "../../components/loader/WebsiteLoader";
import Pagination from "../../components/pagination/Pagination";

const getData = async (page = 1, filter) => {
  const res = await axiosClient.get(
    `/site/posts?page=${page}${
      filter?.country.value ? `&country_id=${filter?.country?.value}` : ""
    }${filter?.city.value ? `&city_id=${filter?.city?.value}` : ""}${
      filter?.category.value ? `&category_id=${filter?.category?.value}` : ""
    }${
      filter?.subcategory.value
        ? `&subcategory_id=${filter?.subcategory?.value}`
        : ""
    }${
      filter?.childcategory.value
        ? `&childcategory_id=${filter?.childcategory?.value}`
        : ""
    }${filter?.price.minPrice ? `&minPrice=${filter?.price?.minPrice}` : ""}${
      filter?.price.maxPrice ? `&maxPrice=${filter?.price?.maxPrice}` : ""
    }${
      filter?.chooseType?.value ? `&${filter.chooseType.value}=${"desc"}` : ""
    }${filter?.search?.length > 0 ? `&text=${filter?.search}` : ""}`
  );
  return res;
};

function PostJobs(props) {
  const { FILTER_DATA, loading } = useGlobalDataContext();
  console.log(loading);
  const [filter, setFilter] = useState({
    country: "",
    city: "",
    search: "",
    category: "",
    subcategory: "",
    childcategory: "",
    price: "",
    match: "",
    chooseType: "",
  });
  console.log(filter);
  const [page, setPage] = useState(1);
  const {
    data: posts,
    queryClient,
    isLoading,
    isRefetching,
  } = useQueryHook(
    ["siteJobs", page, filter],
    () => getData(page, filter),
    "paginate",
    page
  );

  return (
    <>
      <div className="website-page sm:px-12 px-2 py-24 flex flex-col gap-12 text-center  justify-center items-center">
        {loading ? (
          <WebsiteLoader />
        ) : (
          <>
            <div className="flex flex-col gap-6 w-full">
              <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold">
                Jobs
              </h2>
              <div className="jobs-container">
                <div className="jobs-filter grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
                  <FilterContainer
                    filter={filter}
                    setFilter={setFilter}
                    data={FILTER_DATA}
                  />
                </div>
                <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 my-8">
                  {isLoading || isRefetching
                    ? Array.from(Array(4).keys()).map((ele) => (
                        <PostJobsCardLoader key={ele} />
                      ))
                    : posts?.data?.data.map((item, index) => {
                        return <PostJobsCard key={index} item={item} />;
                      })}
                </div>
              </div>
            </div>
            <Pagination data={posts} setPage={setPage} />
          </>
        )}
      </div>
    </>
  );
}

export default PostJobs;
