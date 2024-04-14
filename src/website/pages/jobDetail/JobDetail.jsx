import { useParams } from "react-router-dom";
import JobSection from "./components/JobSection";
import "./style/JobDetail.css";
import JobDetailLoader from "./JobDetailLoader";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import Loader from "./../../../Components/Loader";
import WebsiteLoader from "../../components/loader/WebsiteLoader";

const getData = async (id) => {
  const res = await axiosClient.get(`site/post/${id}`);
  return res.data.data;
};

function JobDetail() {
  let { id } = useParams();

  const { data: post, isLoading } = useQueryHook(["post", id], () =>
    getData(id)
  );

  return (
    <div className="job-details-container py-10 min-h-[600px]">
      {isLoading ? <WebsiteLoader /> : <JobSection data={post} />}
    </div>
  );
}

export default JobDetail;
