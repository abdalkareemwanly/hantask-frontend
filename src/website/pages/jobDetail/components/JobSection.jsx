import { Link } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import "../style/JobSection.css";
import { MdOutlineWorkOutline } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { FaMapLocation } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { LiaListUlSolid } from "react-icons/lia";
import { IoMdEye } from "react-icons/io";

function JobSection({ data }) {
  try {
    return (
      <>
        <div className="job-details grid lg:grid-cols-3 lg:gap-20 gap-0">
          <div className="job-info lg:col-span-2 col-span-3">
            <div className="image-container w-full">
              <img src={data.coverImage} alt="" />
            </div>
            <Link to={"/buyer-profile"}>
              <div className="personal-info-container flex">
                <div className="personal-image">
                  <img src={data.personalImage} alt="" />
                </div>
                <div className="personal-info flex flex-col justify-center">
                  <h5>{data.buyerName}</h5>
                  <div className="personal-info-details flex gap-4">
                    <div className="flex">
                      <MdOutlineWorkOutline className="personal-info-details-icon" /> <span> Total Posted Jobs: {data.totalJobs}</span>
                    </div>
                    <div className="flex">
                      <IoCalendar className="personal-info-details-icon" /> <span>{data.time}</span>
                    </div>
                    <div className="flex">
                      <IoMdEye className="personal-info-details-icon" /> <span>Total View {data.totalView}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="personal-info-paragraph">
              <h4>Job Details</h4>
              <h5>Positioin Overview:</h5>
              <p>{data.details}</p>
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
                  <span>{data.budget}</span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container">
                  <FaMapLocation className="job-overview-icon" />
                </div>
                <div className="flex flex-col">
                  <h5>Job Location</h5>
                  <span>{data.location}</span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container">
                  <IoCalendar className="job-overview-icon" />
                </div>
                <div className="flex flex-col">
                  <h5>Deadline</h5>
                  <span>{data.deadline}</span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container">
                  <LiaListUlSolid className="job-overview-icon" />
                </div>
                <div className="flex flex-col">
                  <h5>Category</h5>
                  <span>{data.category}</span>
                </div>
              </div>
            </div>
            <Link to={"/login"}>
              <SubmitButton text={"Login To Apply"} classes={"second-button w-full mt-10"} notSubmit={true} onClick={() => {}} />
            </Link>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default JobSection;
