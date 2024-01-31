import COLORS from "../data/colors";
import FeatureCard from "./FeatureCard";

function WhyUs({ paragraph, list }) {
  try {
    return (
      <>
        <div className="bg-[var(--second-bg)] sm:px-[5%] px-[2%] py-[100px] flex flex-col items-center ">
          <h2 className="font-[700] md:text-[45px] sm:text-[38px] text-[28px] lg:mt-0 mt-[20px] text-center">Why Our Marketplace?</h2>
          <p className="text-[var(--light-text)] my-[30px] ellipsis text-center lg:w-[60%] md:w-[80%] w-[100%] px-[30px]">{paragraph}</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
            {list.map((item, index) => {
              return <FeatureCard key={index} name={item.name} icon={item.icon} text={item.text} color={COLORS[index]} />;
            })}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default WhyUs;
