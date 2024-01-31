import { useLocation } from "react-router";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import NoItems from "../../components/common/NoItems";
import PostJobsCard from "../jobs/components/PostJobsCard";
import DEFAULT_DATA from "../jobs/data/defaultData";

function WebSiteChildcategoryJobs(props) {
  try {
    const { state } = useLocation();
    return (
      <>
        <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
          <h3 className="font-[600] text-[32px]">Available Jobs in {state.currentChildcategory?.name}</h3>
          {DEFAULT_DATA.length ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-[30px]">
              {DEFAULT_DATA.map((item, index) => {
                return <PostJobsCard key={index} item={item} />;
              })}
            </div>
          ) : (
            <NoItems text={`No jobs found in ${state.currentChildcategory?.name}`} />
          )}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default WebSiteChildcategoryJobs;
