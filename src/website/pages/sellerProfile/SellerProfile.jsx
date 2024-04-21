import "../buyerProfile/style/BuyerProfile.css";
import TitleLine from "../../components/common/TitleLine";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Review from "../buyerProfile/components/Review";
import REVIEWS_DEFAULT_DATA from "../buyerProfile/data/reviewsDefaultData";
import ProfileSection from "./components/ProfileSection";
import { useParams } from "react-router";
import SellerProfileLoader from "./SellerProfileLoader";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import Service from "../../components/common/Service";
const getData = async (id) => {
  const res = await axiosClient.get(`/site/seller/${id}`);
  return res.data.data;
};

function SellerProfile(props) {
  const { height, width } = useWindowDimensions();
  const sellerId = useParams().id;

  const { data, isLoading } = useQueryHook(["buyer", sellerId], () =>
    getData(sellerId)
  );

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    dotsClass: "slider-dots",
  });

  return isLoading ? (
    <>
      <SellerProfileLoader />
    </>
  ) : (
    <>
      <div className="buyer-profile-container w-full px-[10%] md:px-[5%] px-0">
        <ProfileSection data={data} />
        {/* <div className="buyer-jobs-section">
          <h3>services</h3>
          <TitleLine />
          <div className="py-[30px]">
            <Slider
              pauseOnHover
              {...sliderSettings}
              slidesToShow={
                width >= 1536 ? 4 : width >= 1200 ? 3 : width >= 768 ? 2 : 1
              }
            >
              {data[0]?.dataService.map((item, index) => {
                return <Service key={index} item={item} />;
              })}
            </Slider>
          </div>
        </div> */}
        <div className="buyer-jobs-section">
          <h3>Reviews</h3>
          <TitleLine />
          <div className="py-[30px] flex flex-col">
            {data[0] &&
              data[0]?.dataReviewForm.map((item, index) => {
                return <Review key={index} data={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProfile;
