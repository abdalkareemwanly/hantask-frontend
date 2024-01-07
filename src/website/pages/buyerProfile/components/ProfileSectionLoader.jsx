import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import "../style/ProfileSectionLoader.css";
import { useState } from "react";

function ProfileSectionLoader({ data }) {
  try {
    const [rating, setRating] = useState({ rating: 0, starRatedColor: "var(--main-color)", starDimension: "20px", starSpacing: "2px", numberOfStars: 5, name: "rating" });
    return (
      <>
        <div className="w-full grid grid-cols-12 lg:grid-rows-1 md:grid-rows-2 grid-rows-12 py-[60px] gap-y-[30px] ">
          <div className="lg:col-span-4 md:col-span-6 col-span-12 flex justify-center items-center lg:gap-[30px] gap-[20px] md:row-auto row-span-4">
            <div className="profile-image"></div>
            <div className="flex flex-col justify-center">
              <span className="profile-buyer-name flex gap-[7px] items-center">
                <FaCheckCircle className="profile-buyer-check" />
              </span>
              <div className="buyer-rating">
                <StarRatings {...rating} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col justify-center items-center gap-[15px] md:row-auto row-span-3">
            <div className="profile-info"></div>
            <div className="profile-info"></div>
          </div>
          <div className="lg:col-span-5 md:col-span-12 col-span-12 flex justify-center items-center xl:flex-row lg:flex-col sm:flex-row flex-col gap-[30px] md:row-auto row-span-5">
            <div className="buyer-profile-card flex flex-col justify-center items-center gap-[10px]">
              <div className="buyer-profile-card-icon"></div>
              <h4></h4>
              <span></span>
            </div>
            <div className="buyer-profile-card flex flex-col justify-center items-center gap-[10px]">
              <div className="buyer-profile-card-icon"></div>
              <h4></h4>
              <span></span>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileSectionLoader;
