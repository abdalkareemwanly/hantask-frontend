import { useState } from "react";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import Slider from "react-slick";

function Sponsers({ list }) {
  try {
    const { height, width } = useWindowDimensions();

    const [sliderSettings, setSliderSettings] = useState({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      autoplay: true,
      dotsClass: "slider-dots bigger-slider-active-dot",
    });

    return (
      <>
        <div className=" sm:px-[5%] px-[2%] py-[100px] flex flex-col items-center ">
          <div className=".bigger-slider-active-dot" style={{ width: `calc(100% - 20px)` }}>
            <Slider pauseOnHover {...sliderSettings} slidesToShow={width >= 1250 ? 5 : width >= 1000 ? 4 : width >= 750 ? 3 : width >= 500 ? 2 : 1}>
              {list.map((item, index) => {
                return <img key={index} src={item} className="w-[230px] mx-[10px] h-[75px] object-contain mb-[30px] " />;
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

export default Sponsers;
