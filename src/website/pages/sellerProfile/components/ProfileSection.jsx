import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";

function ProfileSection({ data }) {
  console.log(data);
  const [rating, setRating] = useState({
    rating: Number(data[0].totalReview),
    starRatedColor: "var(--main-color)",
    starDimension: "20px",
    starSpacing: "2px",
    numberOfStars: 5,
    name: "rating",
  });
  return (
    <>
      <div className="w-full grid grid-cols-12 lg:grid-rows-1 md:grid-rows-2 grid-rows-12 py-[60px] gap-y-[30px] ">
        <div className="lg:col-span-4 md:col-span-6 col-span-12 flex justify-center items-center lg:gap-[30px] gap-[20px] md:row-auto row-span-4">
          <div className="profile-image">
            <img src={import.meta.env.VITE_WEBSITE_URL + data[0].image} />
          </div>
          <div className="flex flex-col justify-center">
            <span className="profile-buyer-name flex gap-[7px] items-center">
              {data[0].name} <FaCheckCircle className="profile-buyer-check" />
            </span>
            <div className="buyer-rating">
              <StarRatings {...rating} />

              <span className="rating-number">
                {"(" + data[0].countReview + ")"}
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 md:col-span-6 col-span-12 flex flex-col justify-center items-center gap-[15px] md:row-auto row-span-3">
          <div className="profile-info">
            <span>{"From:  "}</span>
            {data[0].dataAddress}
          </div>
          <div className="profile-info">
            <span>{"joined Since:  "}</span>
            {data[0].created_at.slice(0, 10)}
          </div>
        </div>
        <div className="lg:col-span-5 md:col-span-12 col-span-12 flex justify-center items-center xl:flex-row lg:flex-col sm:flex-row flex-col gap-[30px] md:row-auto row-span-5">
          <div className="buyer-profile-card flex flex-col justify-center items-center gap-[10px]">
            <div className="buyer-profile-card-icon">
              <MdOutlineWorkOutline />
            </div>
            <h4>{data[0].dataService.length}</h4>
            <span>Total services</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
