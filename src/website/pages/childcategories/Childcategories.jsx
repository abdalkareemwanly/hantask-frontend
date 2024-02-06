import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import Childcategory from "../../components/common/Childcategory";
import NoItems from "../../components/common/NoItems";
import PostJobsCard from "../jobs/components/PostJobsCard";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
const getData = async (page = 1, categoryId) => {
  const res = await axiosClient.get(
    `/site/posts${`?subcategory_id=${categoryId}`}`
  );
  return res.data.data;
};
function WebSiteChildcategories(props) {
  const { state } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData1 = async () => {
      const data = await getData(1, state.currentSubcategory.id);
      setPosts(data);
    };
    getData1();
  }, [state]);

  const { categories, subCategories, childCategories } = useGlobalDataContext();
  return (
    <>
      <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
        <h3 className="font-[600] text-[32px]">
          Available Jobs Child Categories in {state.currentSubcategory?.name}
        </h3>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px] mt-[30px]">
          {categories &&
          subCategories &&
          childCategories &&
          state.currentSubcategory
            ? childCategories.map((item, index) => {
                if (item.subcategoryName == state.currentSubcategory.name)
                  return (
                    <Childcategory
                      image={item.image}
                      key={index}
                      name={item.name}
                      id={item.id}
                    />
                  );
              })
            : Array.from(Array(9).keys()).map((item, index) => {
                return <CategoryLoader key={index} />;
              })}
        </div>

        <h3 className="font-[600] text-[32px] mt-[60px]">
          Available Jobs in {state.currentSubcategory?.name}
        </h3>

        {posts.length ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
            {posts.map((item, index) => {
              return <PostJobsCard key={index} item={item} />;
            })}
          </div>
        ) : (
          <NoItems
            text={`No jobs found in ${state.currentSubcategory?.name}`}
          />
        )}
      </div>
    </>
  );
}

export default WebSiteChildcategories;
