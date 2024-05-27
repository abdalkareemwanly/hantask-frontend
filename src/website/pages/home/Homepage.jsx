import Category from "../../components/common/Category";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
import PostJobsCard from "../jobs/components/PostJobsCard";
import PostJobsCardLoader from "../jobs/components/PostJobsCardLoader";
import "./css/mainSection.css";
import { FaArrowRight } from "react-icons/fa";
import { banner2 } from "../../../assets";
import { useQueryHook } from "../../../hooks/useQueryHook";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getNewJobs = async () => {
  const res = await axiosClient.get("/site/posts");
  return res.data.data;
};

const getCat = async () => {
  const cat = await axiosClient.get("/site/category/allcategories");
  return cat.data.data;
};

const test = [
  {
    id: 1,
    title: "Post your project",
    desc: "Easily outline your project and handpick the handyman you want to connect with.",
  },
  {
    id: 2,
    title: "Handyman reach out",
    desc: "Talented artisans who are interested will get in touch with you via email or live chat.",
  },
  {
    id: 3,
    title: "Select your Handyman",
    desc: "Review the profiles of the handyman and choose the ones you'd like to engage with further.",
  },
];

const Homepage = () => {
  const { categories, subCategories, childCategories } = useGlobalDataContext();

  const [newJobs, setNewJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData1 = async () => {
      const data1 = await getNewJobs();
      setNewJobs(data1);
      setIsLoading(false);
    };
    getCat();
    getData1();
  }, []);
  return (
    <div className="">
      <Banner />
      <div className=" lg:px-40 md:px-12  px-6 py-12 flex flex-row items-center flex-wrap">
        <h3 className="text-2xl font-semibold  md:flex-[29%]  flex-grow-0">
          Discovering the perfect handyman for your project
        </h3>
        <div className="flex gap-4 flex-[70%] justify-between flex-wrap">
          {test.map((ele, i) => (
            <div
              key={ele.id}
              className="md:flex-[30%] flex-col border component-shadow rounded-lg p-6 flex gap-12"
            >
              <div className="flex gap-2 flex-col">
                <span className="text-[#016980] text-xl font-semibold">
                  {ele.id}
                </span>
                <h4 className="text-xl font-semibold">{ele.title}</h4>
                <p className="text-sm text-gray-500">{ele.desc}</p>
              </div>
              <FaArrowRight />
            </div>
          ))}
        </div>
      </div>
      <CardsContainer
        title={"Browse by category"}
        bgColor={"bg-[#e9f4ff]"}
        link={"categories"}
      >
        {categories && subCategories && childCategories
          ? categories.slice(0, 6).map((item, index) => {
              return (
                <Category
                  key={index}
                  name={item.name}
                  id={item.id}
                  image={item.image}
                />
              );
            })
          : Array.from(Array(5).keys()).map((item, index) => {
              return <CategoryLoader key={index} />;
            })}
      </CardsContainer>
      <CardsContainer
        title={"Browse the latest deals from homeowners"}
        link={"deals"}
      >
        {!isLoading ? (
          newJobs.length > 0 ? (
            newJobs
              ?.slice(0, 6)
              ?.map((ele, i) => <PostJobsCard key={i} item={ele} />)
          ) : (
            <div className="mt-4 bg-greenColor bg-opacity-50 w-full  p-4 rounded-md">
              no deals yet !
            </div>
          )
        ) : (
          Array.from(Array(6).keys()).map((item, index) => {
            return <PostJobsCardLoader key={index} />;
          })
        )}
      </CardsContainer>
      <div
        className="relative w-full p-3 md:p-6 lg:p-12 min-h-[250px]"
        style={{
          backgroundImage: `url(${banner2})`,
          backgroundPosition: " center ",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute z-[1] bg-[#3486afb5] inset-0 w-full h-full"></div>
        <div className="flex items-center justify-center flex-col gap-6 absolute z-[2] inset-0">
          <h2 className="text-3xl font-bold text-white">Become a Handyman</h2>
          <p className="font-semibold max-w-full md:max-w-[700px] text-white">
            Join as a Handyman to increase your project opportunities and win
            more work
          </p>
          <Link to={"/login"} className="border py-1 px-6 rounded-lg bg-white">
            apply now
          </Link>
        </div>
      </div>
    </div>
  );
};
const getData = async () => {
  const res = await axiosClient.get(`site/category/allcategories`);
  return res;
};

export const Banner = () => {
  const { data: categories, isError } = useQueryHook(
    ["categories"],
    () => getData(),
    "paginate"
  );
  console.log(categories);
  const [data, setData] = useState();
  useEffect(() => {
    if (categories) {
      setData(categories?.data?.data);
    }
  }, [categories]);
  const [searchKey, setSearchKey] = useState("");

  const [searchOpen, setSearchOpen] = useState(false);
  const nav = useNavigate();
  const [selectedOption, setSelectedOption] = useState({});
  const openSearch = () => {
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    setSearchKey(selectedOption?.name);
  }, [selectedOption]);

  const navigateToPostDeal = () => {
    nav("/postDeal", {
      state: {
        data: selectedOption,
      },
    });
  };
  const handleClickOption = (ele) => {
    // console.log(ele);
    setSelectedOption(ele);
    setSearchOpen(false);
  };

  if (isError) <NetworkErrorComponent />;
  return (
    <section>
      <div className="bannerContainer">
        <div className="banner">
          <div className="banner-image"></div>
          <div className="banner-overflow px-8 md:px-16 lg:px-32 flex items-center">
            <div className="flex flex-col gap-4 w-[70%]">
              <div className="banner-line-1 flex items-center gap-2">
                <span></span>
                <span>Finding handyman made easy</span>
              </div>
              <h1 className="text-4xl font-bold">
                The quick way to find suitable handyman
              </h1>
              <p>
                Get the service you need promptly with our team of skilled
                professionals on standby
              </p>
              <div className="relative w-full flex items-center my-8">
                <input
                  className="absolute w-full p-4 rounded-md border-none outline-none text-black"
                  placeholder="What service do you need?"
                  onClick={openSearch}
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  // onBlur={openSearch}
                  onKeyUp={() => setSelectedOption(null)}
                />
                {searchOpen && (
                  <div className="absolute bg-white h-[120px] text-black overflow-y-auto z-10  top-[25px] w-full p-4 flex flex-col gap-4">
                    {data
                      ?.filter(
                        (option) =>
                          searchKey
                            ? option.name
                                ?.toLowerCase()
                                ?.includes(searchKey.toLowerCase())
                            : true // Return true if searchKey is empty, indicating no filtering
                      )
                      ?.map((ele, i) => {
                        return (
                          <div
                            key={i}
                            className={`${
                              selectedOption?.id === ele.id
                                ? "bg-greenColor"
                                : "bg-white"
                            } w-full `}
                            onClick={() => handleClickOption(ele)}
                          >
                            {ele.name}
                          </div>
                        );
                      })}
                  </div>
                )}

                <button
                  onClick={navigateToPostDeal}
                  className="absolute right-2 bg-greenColor p-2 rounded-md"
                >
                  find handyman
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CardsContainer = ({ bgColor, children, title, link }) => {
  return (
    <div className={`${bgColor}   lg:px-40 md:px-12  px-6 py-12 `}>
      <div className="flex justify-between items-center">
        <h1 className="text-[5vw] lg:text-[2vw]  font-semibold mb-4">
          {title}
        </h1>
        <Link
          to={link}
          className="flex bg-greenColor p-2 rounded-md text-sm items-center text-white"
        >
          <span>view more</span> <MdOutlineKeyboardArrowRight size={25} />
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-[24px]">
        {children}
      </div>
    </div>
  );
};

export default Homepage;
