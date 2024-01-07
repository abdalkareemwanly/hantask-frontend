import "./style/BuyerProfile.css";
import TitleLine from "../../components/common/TitleLine";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import ProfileSection from "./components/ProfileSection";
import BUYER_JOBS_DEFAULT_DATA from "./data/buyerJobsDefaultData";
import PostJobsCard from "../jobs/components/PostJobsCard";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useEffect } from "react";
import Review from "./components/Review";
import REVIEWS_DEFAULT_DATA from "./data/reviewsDefaultData";
import PROFILE_SECTION_DEFAULT_DATA from "./data/profileSectionDefaultData";
import BuyerProfileLoader from "./BuyerProfileLoader";

function BuyerProfile(props) {
  try {
    const { height, width } = useWindowDimensions();

    const [sliderSettings, setSliderSettings] = useState({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      autoplay: false,
      dotsClass: "slider-dots",
    });

    return false ? (
      <>
        <BuyerProfileLoader />
      </>
    ) : (
      <>
        <div className="buyer-profile-container w-full px-[10%] md:px-[5%] px-0">
          <ProfileSection data={PROFILE_SECTION_DEFAULT_DATA} />
          <div className="buyer-jobs-section">
            <h3>Job Of This Buyer</h3>
            <TitleLine />
            <div className="py-[30px]">
              <Slider pauseOnHover {...sliderSettings} slidesToShow={width >= 1536 ? 4 : width >= 1200 ? 3 : width >= 768 ? 2 : 1}>
                {BUYER_JOBS_DEFAULT_DATA.map((item, index) => {
                  return <PostJobsCard key={index} item={item} />;
                })}
              </Slider>
            </div>
          </div>
          <div className="buyer-jobs-section">
            <h3>Reviews as Buyer</h3>
            <TitleLine />
            <div className="py-[30px] flex flex-col">
              {REVIEWS_DEFAULT_DATA.map((item, index) => {
                return <Review key={index} data={item} />;
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

export default BuyerProfile;
