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
import { useParams } from "react-router";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async (id) => {
  const res = await axiosClient.get(`/site/buyer/${id}`);
  return res.data.data;
};

function BuyerProfile(props) {
  const id = useParams()?.id;
  console.log(id);

  const { data, isLoading, isError } = useQueryHook(["buyer", id], () =>
    getData(id)
  );
  console.log(data);
  const { height, width } = useWindowDimensions();

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    dotsClass: "slider-dots",
  });

  const params = useParams();
  if (isError) <NetworkErrorComponent />;

  return isLoading ? (
    <>
      <BuyerProfileLoader />
    </>
  ) : (
    <>
      <div className="buyer-profile-container w-full px-[10%] md:px-[5%] px-0">
        <ProfileSection data={data} />
        <div className="buyer-jobs-section">
          <h3>Job Of This Buyer</h3>
          <TitleLine />
          <div className="py-[30px]">
            {data && data[0]?.dataPost.length > 1 ? (
              <Slider
                pauseOnHover
                {...sliderSettings}
                slidesToShow={
                  width >= 1536 ? 4 : width >= 1200 ? 3 : width >= 768 ? 2 : 1
                }
              >
                {data[0]?.dataPost?.map((item, index) => {
                  return (
                    <PostJobsCard withBuyer={false} key={index} item={item} />
                  );
                })}
              </Slider>
            ) : (
              data &&
              data[0]?.dataPost?.map((item, index) => {
                return (
                  <div className="w-[33%]" key={index}>
                    <PostJobsCard withBuyer={false} key={index} item={item} />
                  </div>
                );
              })
            )}
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
}

export default BuyerProfile;
