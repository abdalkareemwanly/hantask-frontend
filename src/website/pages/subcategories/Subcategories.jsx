import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import NoItems from "../../components/common/NoItems";
import Subcategory from "../../components/common/Subcategory";
import PostJobsCard from "../jobs/components/PostJobsCard";
import DEFAULT_DATA from "../jobs/data/defaultData";

function WebSiteSubcategories(props) {
  try {
    const { state } = useLocation();
    const { categories, subCategories, childCategories } =
      useGlobalDataContext();
    return (
      <>
        <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
          <h3 className="font-[600] text-[32px]">
            Available Jobs Sub Categories in {state.currentCategory?.name}
          </h3>
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
                  return <CategoryLoader key={index} />;
                })}
          </div>
          <h3 className="font-[600] text-[32px] mt-[60px]">
            Available Jobs in {state.currentCategory?.name}
          </h3>
          {DEFAULT_DATA.length ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
              {DEFAULT_DATA.map((item, index) => {
                return <PostJobsCard key={index} item={item} />;
              })}
            </div>
          ) : (
            <NoItems text={`No jobs found in ${state.currentCategory?.name}`} />
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default WebSiteSubcategories;
