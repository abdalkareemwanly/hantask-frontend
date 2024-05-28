import { useParams } from "react-router-dom";
import JobSection from "./components/JobSection";
import "./style/JobDetail.css";
import JobDetailLoader from "./JobDetailLoader";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import Loader from "./../../../Components/Loader";
import WebsiteLoader from "../../components/loader/WebsiteLoader";
import NetworkErrorComponent from "./../../../Components/NetworkErrorComponent";

const getData = async (id, userId) => {
  const res = await axiosClient.post(`site/post/${id}`, {
    userId: userId,
  });
  return res.data.data;
};

function JobDetail() {
  let { id } = useParams();
  const userId = JSON.parse(localStorage.getItem("USER"))?.id;

  const {
    data: post,
    isLoading,
    isError,
  } = useQueryHook(["post", id], () => getData(id, userId));

  return (
    <div className="job-details-container py-10 min-h-[600px]">
      {isLoading ? (
        <WebsiteLoader />
      ) : isError ? (
        <NetworkErrorComponent />
      ) : (
        <JobSection data={post} />
      )}
    </div>
  );
}

export default JobDetail;
