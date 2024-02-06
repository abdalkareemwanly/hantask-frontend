import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import NoItems from "../../components/common/NoItems";
import PostJobsCard from "../jobs/components/PostJobsCard";
import DEFAULT_DATA from "../jobs/data/defaultData";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
const getData = async (page = 1, categoryId) => {
  const res = await axiosClient.get(
    `/site/posts${`?childcategory_id=${categoryId}`}`
  );
  return res.data.data;
};
function WebSiteChildcategoryJobs(props) {
  const { state } = useLocation();
  const [posts, setPosts] = useState([]);
  console.log(state);
  useEffect(() => {
    const getData1 = async () => {
      const data = await getData(1, state.currentChildcategory.id);
      setPosts(data);
    };
    getData1();
  }, [state]);
  return (
    <>
      <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
        <h3 className="font-[600] text-[32px]">
          Available Jobs in {state.currentChildcategory?.name}
        </h3>
        {posts.length ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
            {posts.map((item, index) => {
              return <PostJobsCard key={index} item={item} />;
            })}
          </div>
        ) : (
          <NoItems
            text={`No jobs found in ${state.currentChildcategory?.name}`}
          />
        )}
      </div>
    </>
  );
}

export default WebSiteChildcategoryJobs;
