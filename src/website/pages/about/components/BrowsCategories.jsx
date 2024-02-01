import { useState } from "react";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import Slider from "react-slick";
import BrowsCategoryItem from "./BrowsCategoryItem";
import COLORS from "../data/colors";

function BrowsCategories({ paragraph, list }) {
  try {
    const { height, width } = useWindowDimensions();

    const [sliderSettings, setSliderSettings] = useState({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      autoplay: true,
      dotsClass: "slider-dots",
    });

    return (
      <>
        <div className=" sm:px-[5%] px-[2%] py-[100px] flex flex-col items-center ">
          <h2 className="font-[700] md:text-[45px] sm:text-[38px] text-[28px] lg:mt-0 mt-[20px] text-center">Browse Categories</h2>
          <p className="text-[var(--light-text)] my-[30px] ellipsis text-center lg:w-[60%] md:w-[80%] w-[100%] px-[30px]">{paragraph}</p>
          <div style={{ width: `calc(100% - 20px)` }}>
            <Slider pauseOnHover {...sliderSettings} slidesToShow={width >= 1250 ? 5 : width >= 1000 ? 4 : width >= 750 ? 3 : width >= 500 ? 2 : 1}>
              {list.map((item, index) => {
                return <BrowsCategoryItem key={index} color={COLORS[index]} name={item.name} icon={item.icon} number={item.number} />;
              })}
            </Slider>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BrowsCategories;
