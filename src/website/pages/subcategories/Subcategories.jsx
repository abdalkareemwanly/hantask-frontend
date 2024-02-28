import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import NoItems from "../../components/common/NoItems";
import Subcategory from "../../components/common/Subcategory";
import PostJobsCard from "../jobs/components/PostJobsCard";
import DEFAULT_DATA from "../jobs/data/defaultData";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import TitleLine from "../../components/common/TitleLine";
const getData = async (page = 1, categoryId) => {
  const res = await axiosClient.get(
    `/site/posts${`?category_id=${categoryId}`}`
  );
  return res.data.data;
};
function WebSiteSubcategories(props) {
  const { state } = useLocation();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData1 = async () => {
      const data = await getData(1, state.currentCategory.id);
      setPosts(data);
    };
    getData1();
  }, [state]);

  const { categories, subCategories, childCategories } = useGlobalDataContext();
  return (
    <>
      <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
        <h3 className="font-[600] text-[32px]">
          Available Jobs Sub Categories in {state.currentCategory?.name}
        </h3>
        <TitleLine />
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px] mt-[30px]">
          {categories &&
          subCategories &&
          childCategories &&
          state.currentCategory
            ? subCategories.map((item, index) => {
                if (item.categoryName == state.currentCategory.name)
                  return (
                    <Subcategory
                      key={index}
                      name={item.name}
                      image={item.image}
                      id={item.id}
                    />
                  );
              })
            : Array.from(Array(9).keys()).map((item, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <CategoryLoader key={index} />
                  </div>
                );
              })}
        </div>
        <h3 className="font-[600] text-[32px] mt-[60px]">
          Available deals in {state.currentCategory?.name}
        </h3>
        {posts.length ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
            {posts.map((item, index) => {
              return <PostJobsCard key={index} item={item} />;
            })}
          </div>
        ) : (
          <NoItems text={`No jobs found in ${state.currentCategory?.name}`} />
        )}
      </div>
    </>
  );
}

export default WebSiteSubcategories;
