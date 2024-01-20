import Category from "../../components/common/Category";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Service from "../../components/common/Service";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="">
      <Banner />
      <CardsContainer title={"categories"} bgColor={"#fff9f3"}>
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </CardsContainer>
      <CardsContainer title={"featured services"}>
        <Service />
        <Service />
        <Service />
        <Service />
      </CardsContainer>
      <div className="lg:px-20 md:px-12  px-6 py-8">
        <div className="flex items-center flex-col justify-center gap-8">
          <h2 className="text-[6vw] md:text-[4vw] lg:text-[3vw]">
            Why Choose Qixer?
          </h2>
          <p className=" lg:w-1/2 text-center">
            Qixer is a best service-based marketplace out there to help you get
            any task done conveniently. Thanks to our well built mobile app and
            website for making it even convenient for the users.
          </p>
          <a
            href="#"
            className="text-center w-[200px] bg-[#ff6b2c] text-white py-3 rounded-md font-semibold"
          >
            join as a Customer
          </a>
          <div className="flex items-center flex-col md:flex-row flex-wrap gap-6">
            <div className="flex gap-3 items-center border p-3 rounded-lg hover:border-transparent hover:component-shadow transition-all">
              <div>
                <img src="/src/images/choose1.png" alt="" />
              </div>
              <div>
                <h4 className="text-lg font-medium">test</h4>
                <p className="text-gray-500">
                  People loved services provided by our taskers
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center border p-3 rounded-lg hover:border-transparent hover:component-shadow transition-all">
              <div>
                <img src="/src/images/choose2.png" alt="" />
              </div>
              <div>
                <h4 className="text-lg font-medium">test</h4>
                <p className="text-gray-500">
                  People loved services provided by our taskers
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center border p-3 rounded-lg hover:border-transparent hover:component-shadow transition-all">
              <div>
                <img src="/src/images/choose3.png" alt="" />
              </div>
              <div>
                <h4 className="text-lg font-medium">test</h4>
                <p className="text-gray-500">
                  People loved services provided by our taskers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardsContainer title={"popular services"}>
        <Service />
        <Service />
        <Service />
        <Service />
      </CardsContainer>
      <div className="flex items-center justify-center gap-8 bg-[#f5f7ff] lg:px-40 md:px-12 px-6 py-8 ">
        <div className="w-full md:w-2/3 flex items-center justify-center gap-12 flex-col-reverse md:flex-row">
          <div className="md:w-1/2 w-full flex flex-col gap-6">
            <h2 className="text-[4vw] md:text-[6vw] lg:text-[2.5vw] font-semibold">
              Join with us as a service provider and earn a good remuneration
            </h2>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-2">
                <FaCheck />
                <span>Get regular works</span>
              </span>
              <span className="flex items-center gap-2">
                <FaCheck />
                <span>24/7 Support</span>
              </span>
              <span className="flex items-center gap-2">
                <FaCheck />
                <span>Generous service buyers</span>
              </span>
            </div>
            <a
              href="#"
              className="text-center w-[200px] bg-[#ff6b2c] text-white py-3 rounded-md font-semibold"
            >
              join as a Customer
            </a>
          </div>
          <div className="md:w-1/2 w-full text-center">
            <img
              className="w-[100%] object-contain"
              src="/src/images/poeple.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const Banner = () => {
  return (
    <div className="flex items-center justify-center bg-[#f5f7ff] lg:px-20 md:px-12  px-6 ">
      <div className="flex flex-col lg:flex-row gap-2 py-12 w-full 2xl:w-[75%] xl:w-[100%]   lg:items-center">
        <div className="flex-1 flex flex-col justify-center items-center lg:items-start gap-10">
          <h2 className="text-[7vw] md:text-[6vw] lg:text-[3vw] font-semibold">
            Get any tasks done <br /> by professionals
          </h2>
          <p>Order service you need, We have professionals ready to help</p>
          <div className="flex flex-row gap-10 overflow-visible lg:w-[125%] w-full z-10">
            <input
              type="text"
              placeholder="search by location"
              className="bg-white outline-none border-none py-4 px-8 self-end rounded-md w-full component-shadow"
            />
            <button className="bg-[#ff6b2c] py-2 px-8 text-white rounded-lg">
              search
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex">
              <div
                className="bg-[#4d77ff] w-[50px] h-[50px] rounded-3xl mx-[-7px] border-white hover:mx-[0px] transition-all hover:scale-110"
                style={{
                  backgroundImage: "url(/src/images/banner2.png)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                className="bg-black w-[50px] h-[50px] rounded-3xl mx-[-7px] border-white hover:mx-[0px] transition-all hover:scale-110"
                style={{
                  backgroundImage: "url(/src/images/banner2.png)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                className="bg-black w-[50px] h-[50px] rounded-3xl mx-[-7px] border-white hover:mx-[0px] transition-all hover:scale-110"
                style={{
                  backgroundImage: "url(/src/images/banner2.png)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <div
                className="bg-black w-[50px] h-[50px] rounded-3xl mx-[-7px] border-white hover:mx-[0px] transition-all hover:scale-110"
                style={{
                  backgroundImage: "url(/src/images/banner2.png)",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <span>2k+ Satisficed Customer</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/jobs"}>
              <button>post jobs</button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:items-start gap-4 ">
          <div
            className="bg-[#4d77ff] w-[310px] h-[400px] rounded-3xl"
            style={{
              backgroundImage: "url(/src/images/banner2.png)",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            className="bg-[#ff6b2c] w-[310px] h-[400px] rounded-3xl"
            style={{
              backgroundImage: "url(/src/images/banner1.png)",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const CardsContainer = ({ bgColor, children, title, link }) => {
  return (
    <div className={`bg-[${bgColor}] lg:px-40 md:px-12  px-6 py-12 `}>
      <div className="flex justify-between items-center">
        <h1 className="text-[5vw] lg:text-[2vw]  font-semibold mb-4">
          {title}
        </h1>
        <a href={link} className="text-[#ff6b2c] flex  gap-1">
          <span>show more</span> <MdOutlineKeyboardArrowRight size={25} />
        </a>
      </div>
      <div className="flex flex-wrap flex-col md:flex-row justify-between  items-center gap-6">
        {children}
      </div>
    </div>
  );
};
export default Homepage;
