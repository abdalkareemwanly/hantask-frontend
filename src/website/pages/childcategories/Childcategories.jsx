import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import Childcategory from "../../components/common/Childcategory";
import NoItems from "../../components/common/NoItems";
import PostJobsCard from "../jobs/components/PostJobsCard";
import DEFAULT_DATA from "../jobs/data/defaultData";

function WebSiteChildcategories(props) {
  try {
    const { state } = useLocation();
    const { categories, subCategories, childCategories } =
      useGlobalDataContext();
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

          {DEFAULT_DATA.length ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
              {DEFAULT_DATA.map((item, index) => {
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
  } catch (err) {
    console.log(err);
  }
}

export default WebSiteChildcategories;
