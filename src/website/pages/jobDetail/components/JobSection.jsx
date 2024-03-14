import { Link } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import "../style/JobSection.css";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaMapLocation } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { LiaListUlSolid } from "react-icons/lia";
import { IoMdEye } from "react-icons/io";
import { formatMoney } from "../../../../functions/price";

function JobSection({ data }) {
  const isUser = localStorage.getItem("ACCESS_TOKEN");
  const isUserSeller =
    JSON.parse(localStorage.getItem("USER"))?.user_type == "seller";

  return (
    <div className="job-details grid lg:grid-cols-3 lg:gap-20 gap-0">
      <div className="job-info lg:col-span-2 col-span-3">
        <div className="image-container w-full component-shadow">
          <img src={import.meta.env.VITE_WEBSITE_URL + data?.image} />
        </div>
        <Link to={`/buyer-profile/${data.buyer_id}`}>
          <div className="personal-info-container flex  mt-[20px]">
            <div className="personal-image">
              <img src={import.meta.env.VITE_WEBSITE_URL + data?.buyer_image} />
            </div>
            <div className="personal-info flex flex-col justify-center">
              <h5>{data?.buyer_name}</h5>
              <div className="personal-info-details flex gap-4 sm:flex-row flex-col">
                <div className="flex">
                  <IoCalendar className="personal-info-details-icon" />{" "}
                  <span>{data?.dead_line}</span>
                </div>
                <div className="flex">
                  <IoMdEye className="personal-info-details-icon" />{" "}
                  <span>Total View {data?.view_post_count}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        <div className="personal-info-paragraph">
          <h4>Job description</h4>
          <p>{data?.description}</p>
        </div>
      </div>
      <div className="job-overview lg:mt-0 mt-20 lg:col-span-1 col-span-3">
        <h4 className="mb-10">Job Overview</h4>
        <div className="flex flex-col gap-6">
          <div className="flex">
            <div className="job-overview-icon-container">
              <LiaCoinsSolid className="job-overview-icon" />
            </div>
            <div className="flex flex-col">
              <h5>Budget</h5>
              <span>{formatMoney(Number(data?.budget))}</span>
            </div>
          </div>
          <div className="flex">
            <div className="job-overview-icon-container">
              <FaMapLocation className="job-overview-icon" />
            </div>
            <div className="flex flex-col">
              <h5>Job Location</h5>
              <span>{data?.country_name + ", " + data?.city_name}</span>
            </div>
          </div>
          <div className="flex">
            <div className="job-overview-icon-container">
              <IoCalendar className="job-overview-icon" />
            </div>
            <div className="flex flex-col">
              <h5>Deadline</h5>
              <span>{data?.dead_line}</span>
            </div>
          </div>
          <div className="flex">
            <div className="job-overview-icon-container">
              <LiaListUlSolid className="job-overview-icon" />
            </div>
            <div className="flex flex-col">
              <h5>Category</h5>
              <span>
                {data?.category_name +
                  " > " +
                  data?.subcategory_name +
                  " > " +
                  data?.childCategory_name}
              </span>
            </div>
          </div>
        </div>
        {!isUser ? (
          <Link to={"/login"}>
            <SubmitButton
              text={"Login To Apply"}
              classes={"second-button w-full mt-10"}
              notSubmit={true}
              onClick={() => {}}
            />
          </Link>
        ) : isUserSeller ? (
          !data?.dataComment ? (
            <Link to={"/apply-job"} state={{ postData: data }}>
              <SubmitButton
                text={"Apply now"}
                classes={"second-button w-full mt-10"}
                notSubmit={true}
              />
            </Link>
          ) : (
            <SubmitButton
              text={"already Applied"}
              classes={"second-button w-full mt-10"}
              notSubmit={true}
            />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default JobSection;
