import { useParams } from "react-router-dom";
import PostJobsCard from "../jobs/components/PostJobsCard";
import JobSection from "./components/JobSection";
import OTHER_JOBS_DEFAULT_DATA from "./data/otherJobsDefaultData";
import SIMILAR_JOBS_DEFAULT_DATA from "./data/similarJobsDefaultData";
import "./style/JobDetail.css";
import JOB_DETAILS_DEFAULT_DATA from "./data/jobDetailsDefaultData";
import JobDetailLoader from "./JobDetailLoader";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";

const getData = async (id) => {
  const res = await axiosClient.get(`site/post/${id}`);
  return res.data.data;
};

function JobDetail(props) {
  let { id } = useParams();

  const { data: post, isLoading } = useQueryHook(["post", id], () =>
    getData(id)
  );

  console.log(post);

  return isLoading ? (
    <>
      <JobDetailLoader />
    </>
  ) : (
    <>
      <div className="job-details-container py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
        <h3 className="job-header-title mb-[40px]">{post.title}</h3>
        <JobSection data={post} />
        <div className="other-jobs my-10">
          <h4>This Buyer Other Jobs</h4>
          {/* <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {OTHER_JOBS_DEFAULT_DATA.map((item, index) => {
              return <PostJobsCard key={index} item={item} />;
            })}
          </div> */}
          soon
        </div>
        <div className="similar-jobs my-10">
          <h4>Similar Jobs</h4>
          <div className="jobs-cards grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {/* {SIMILAR_JOBS_DEFAULT_DATA.map((item, index) => {
              return <PostJobsCard key={index} item={item} />;
            })} */}
            soon
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;
