import BrowsCategories from "./components/BrowsCategories";
import KnowAboutUs from "./components/KnowAboutUs";
import Sponsers from "./components/Sponsers";
import StartAsSeller from "./components/StartAsSeller";
import WhyUs from "./components/WhyUs";
import BROWS_CATEGORIES_DATA from "./data/BrowsCategoriesData";
import KNOW_ABOUT_US_DATA from "./data/KnowAboutUsData";
import SPONSERS_DATA from "./data/SponsersData";
import START_AS_SELLER_DATA from "./data/StartAsSellerData";
import WHY_US_DATA from "./data/WhyUsData";

function About(props) {
  try {
    return (
      <>
        <div className="w-[100%]my-[30px]">
          <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold text-center my-[30px]">About</h2>
          <KnowAboutUs image={KNOW_ABOUT_US_DATA.image} paragraph={KNOW_ABOUT_US_DATA.paragraph} list={KNOW_ABOUT_US_DATA.list} experienceYear={KNOW_ABOUT_US_DATA.experienceYear} />
          <WhyUs paragraph={WHY_US_DATA.paragraph} list={WHY_US_DATA.list} />
          <BrowsCategories paragraph={BROWS_CATEGORIES_DATA.paragraph} list={BROWS_CATEGORIES_DATA.list} />
          <StartAsSeller image={START_AS_SELLER_DATA.image} paragraph={START_AS_SELLER_DATA.paragraph} list={START_AS_SELLER_DATA.list} />
          <Sponsers list={SPONSERS_DATA} />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default About;
