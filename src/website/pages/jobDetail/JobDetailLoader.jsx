import PostJobsCardLoader from "../jobs/components/PostJobsCardLoader";
import JobSectionLoader from "./components/JobSectionLoader";
import JOB_DETAILS_DEFAULT_DATA from "./data/jobDetailsDefaultData";
import "./style/JobDetailLoader.css";

function JobDetailLoader(props) {
  try {
    return (
      <div className={"loader"}>
        <div className="job-details-container py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
          <h3 className="job-header-title mb-[40px]"></h3>
          <JobSectionLoader data={JOB_DETAILS_DEFAULT_DATA} />
          <div className="other-jobs my-10">
            <h4></h4>
            <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {Array.from(Array(3).keys()).map((item, index) => {
                return <PostJobsCardLoader />;
              })}
            </div>
          </div>
          <div className="similar-jobs my-10">
            <h4></h4>
            <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {Array.from(Array(3).keys()).map((item, index) => {
                return <PostJobsCardLoader />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default JobDetailLoader;
