import { Link } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import { MdOutlineWorkOutline } from "react-icons/md";
import "../style/JobSectionLoader.css";

function JobSectionLoader({ data }) {
  try {
    return (
      <>
        <div className="job-details grid lg:grid-cols-3 lg:gap-20 gap-0">
          <div className="job-info lg:col-span-2 col-span-3">
            <div className="image-container w-full"></div>
            <div className="personal-info-container flex">
              <div className="personal-image"></div>
              <div className="personal-info flex flex-col justify-center">
                <h5></h5>
                <div className="personal-info-details flex gap-4">
                  <div className="flex">
                    <span> </span>
                  </div>
                  <div className="flex">
                    <span></span>
                  </div>
                  <div className="flex">
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="personal-info-paragraph">
              <h4></h4>
              <h5></h5>
              <p></p>
            </div>
          </div>
          <div className="job-overview lg:mt-0 mt-20 lg:col-span-1 col-span-3">
            <h4 className="mb-10"></h4>
            <div className="flex flex-col gap-6">
              <div className="flex">
                <div className="job-overview-icon-container"></div>
                <div className="flex flex-col">
                  <h5></h5>
                  <span></span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container"></div>
                <div className="flex flex-col">
                  <h5></h5>
                  <span></span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container"></div>
                <div className="flex flex-col">
                  <h5></h5>
                  <span></span>
                </div>
              </div>
              <div className="flex">
                <div className="job-overview-icon-container"></div>
                <div className="flex flex-col">
                  <h5></h5>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default JobSectionLoader;
