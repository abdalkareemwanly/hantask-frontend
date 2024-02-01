import TitleLine from "../../components/common/TitleLine";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useEffect } from "react";
import ReviewLoader from "../buyerProfile/components/ReviewLoader";
import ProfileSectionLoader from "../buyerProfile/components/ProfileSectionLoader";
import ServiceCardLoader from "../../components/common/ServiceCardLoader";

function SellerProfileLoader(props) {
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

    return (
      <>
        <div className="buyer-profile-container w-full px-[10%] md:px-[5%] px-0 loader">
          <ProfileSectionLoader />
          <div className="buyer-jobs-section">
            <h3></h3>
            <TitleLine />
            <div className="py-[30px]">
              <Slider pauseOnHover {...sliderSettings} slidesToShow={width >= 1536 ? 4 : width >= 1200 ? 3 : width >= 768 ? 2 : 1}>
                {Array.from(Array(5).keys()).map((item, index) => {
                  return <ServiceCardLoader key={index} />;
                })}
              </Slider>
            </div>
          </div>
          <div className="buyer-jobs-section">
            <h3></h3>
            <TitleLine />
            <div className="py-[30px] flex flex-col">
              {Array.from(Array(3).keys()).map((item, index) => {
                return <ReviewLoader key={index} />;
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

export default SellerProfileLoader;
