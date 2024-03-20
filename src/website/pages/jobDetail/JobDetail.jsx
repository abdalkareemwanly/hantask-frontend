import { useParams } from "react-router-dom";
import JobSection from "./components/JobSection";
import "./style/JobDetail.css";
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

  return isLoading ? (
    <>
      <JobDetailLoader />
    </>
  ) : (
    <>
      <div className="job-details-container py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
        <h3 className="job-header-title mb-[40px]">{post.title}</h3>
        <JobSection data={post} />
      </div>
    </>
  );
}

export default JobDetail;
