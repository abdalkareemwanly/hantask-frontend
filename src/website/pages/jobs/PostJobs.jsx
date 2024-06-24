import { useState } from "react";
import PostJobsCard from "./components/PostJobsCard";
import "./style/PostJobs.css";
import FilterContainer from "../../components/filter/FilterContainer";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import PostJobsCardLoader from "./components/PostJobsCardLoader";
import WebsiteLoader from "../../components/loader/WebsiteLoader";
import Pagination from "../../components/pagination/Pagination";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async (page = 1, filter, userId) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    const res = await axiosClient.get(
      `/site/posts2?page=${page}${
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
      }${filter?.search?.length > 0 ? `&text=${filter?.search}` : ""}`,
      {
        data: {
          userId: userId,
        },
      }
    );
    return res;
  } else {
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
      }${filter?.search?.length > 0 ? `&text=${filter?.search}` : ""}`,
      {
        data: {
          userId: userId,
        },
      }
    );
    return res;
  }
};

function PostJobs(props) {
  const { FILTER_DATA, loading } = useGlobalDataContext();
  // console.log(loading);
  const userId = JSON.parse(localStorage.getItem("USER"))?.id;
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
  // console.log(filter);
  const [page, setPage] = useState(1);
  const {
    data: posts,
    isLoading,
    isRefetching,
    isError,
  } = useQueryHook(
    ["siteJobs", page, filter],
    () => getData(page, filter, userId),
    "paginate",
    page
  );
  if (isError) return <NetworkErrorComponent />;

  return (
    <div className="website-page  lg:px-32 md:px-16 px-8 py-24 flex flex-col gap-12 text-center   items-center">
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
              <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4 my-8">
                {isLoading || isRefetching ? (
                  Array.from(Array(4).keys()).map((ele) => (
                    <PostJobsCardLoader key={ele} />
                  ))
                ) : posts?.data?.data.length > 0 ? (
                  posts?.data?.data.map((item, index) => {
                    return <PostJobsCard key={index} item={item} />;
                  })
                ) : (
                  <div className="mt-4 bg-greenColor bg-opacity-50 w-full  p-4 rounded-md">
                    no deals yet !
                  </div>
                )}
              </div>
            </div>
          </div>
          {posts?.data?.data.length > 0 ? (
            <Pagination data={posts} setPage={setPage} />
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default PostJobs;
