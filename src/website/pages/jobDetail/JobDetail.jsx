import { useParams } from "react-router-dom";
import PostJobsCard from "../jobs/components/PostJobsCard";
import JobSection from "./components/JobSection";
import OTHER_JOBS_DEFAULT_DATA from "./data/otherJobsDefaultData";
import SIMILAR_JOBS_DEFAULT_DATA from "./data/similarJobsDefaultData";
import "./style/JobDetail.css";
import JOB_DETAILS_DEFAULT_DATA from "./data/jobDetailsDefaultData";
import JobDetailLoader from "./JobDetailLoader";

function JobDetail(props) {
  try {
    return false ? (
      <>
        <JobDetailLoader />
      </>
    ) : (
      <>
        <div className="job-details-container py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
          <h3 className="job-header-title mb-[40px]">{JOB_DETAILS_DEFAULT_DATA.jobTitle}</h3>
          <JobSection data={JOB_DETAILS_DEFAULT_DATA} />
          <div className="other-jobs my-10">
            <h4>This Buyer Other Jobs</h4>
            <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {OTHER_JOBS_DEFAULT_DATA.map((item, index) => {
                return <PostJobsCard key={index} item={item} />;
              })}
            </div>
          </div>
          <div className="similar-jobs my-10">
            <h4>Similar Jobs</h4>
            <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {SIMILAR_JOBS_DEFAULT_DATA.map((item, index) => {
                return <PostJobsCard key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default JobDetail;
