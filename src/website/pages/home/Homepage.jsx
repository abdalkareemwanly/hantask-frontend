import Category from "../../components/common/Category";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Service from "../../components/common/Service";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import CategoryLoader from "../../components/common/CategoryLoader";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
import PostJobsCard from "../jobs/components/PostJobsCard";
import PostJobsCardLoader from "../jobs/components/PostJobsCardLoader";
import "./css/mainSection.css";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../../Components/Button";

const getNewJobs = async () => {
  const res = await axiosClient.get("/site/posts");
  return res.data.data;
};
const getPopulerJobs = async () => {
  const res = await axiosClient.get("/site/posts");
  return res.data.data;
};
const getTotalUsers = async () => {
  const res = await axiosClient.get("/site/users/total");
  return res.data;
};

const Homepage = () => {
  const { categories, subCategories, childCategories } = useGlobalDataContext();

  const [newJobs, setNewJobs] = useState([]);
  const [users, setUsers] = useState({});
  const [populerJobs, setPopulerJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData1 = async () => {
      const data1 = await getNewJobs();
      setNewJobs(data1);
    };
    const getData2 = async () => {
      const data2 = await getPopulerJobs();
      setPopulerJobs(data2);
      setIsLoading(false);
    };

    getData1();
    getData2();
  }, []);

  useEffect(() => {
    const gettotal = async () => {
      const data = await getTotalUsers();
      setUsers(data);
    };
    gettotal();
  }, []);

  return (
    <div className="">
      <Banner total_users={users} />
      <div className=" lg:px-40 md:px-12  px-6 py-12 flex flex-row items-center flex-wrap">
        <h3 className="text-2xl font-semibold  md:flex-[30%]  flex-grow-0">
          Discovering the perfect handyman for your project
        </h3>
        <div className="flex gap-4 flex-[70%] justify-between flex-wrap">
          <div className="md:flex-[30%] flex-col border component-shadow rounded-lg p-6 flex gap-12">
            <div className="flex gap-2 flex-col">
              <span className="text-[#016980] text-xl font-semibold">01</span>
              <h4 className="text-xl font-semibold">Post your projec</h4>
              <p className="text-sm text-gray-500">
                Easily outline your project and handpick the handyman you want
                to connect wi
              </p>
            </div>
            <FaArrowRight />
          </div>
          <div className="md:flex-[30%] flex-col border component-shadow rounded-lg p-6 flex gap-12">
            <div className="flex gap-2 flex-col">
              <span className="text-[#016980] text-xl font-semibold">01</span>
              <h4 className="text-xl font-semibold">Post your projec</h4>
              <p className="text-sm text-gray-500">
                Easily outline your project and handpick the handyman you want
                to connect wi
              </p>
            </div>
            <FaArrowRight />
          </div>
          <div className="md:flex-[30%] flex-col border component-shadow rounded-lg p-6 flex gap-12">
            <div className="flex gap-2 flex-col">
              <span className="text-[#016980] text-xl font-semibold">01</span>
              <h4 className="text-xl font-semibold">Post your projec</h4>
              <p className="text-sm text-gray-500">
                Easily outline your project and handpick the handyman you want
                to connect wi
              </p>
            </div>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <CardsContainer
        title={"Browse by category"}
        bgColor={"bg-[#e9f4ff]"}
        link={"categories"}
      >
        {categories && subCategories && childCategories
          ? categories.map((item, index) => {
              return (
                <Category
                  key={index}
                  name={item.name}
                  id={item.id}
                  image={item.image}
                />
              );
            })
          : Array.from(Array(4).keys()).map((item, index) => {
              return <CategoryLoader key={index} />;
            })}
      </CardsContainer>
      <CardsContainer
        title={"Browse the latest deals from homeowners"}
        link={"deals"}
      >
        {!isLoading
          ? newJobs?.map((ele, i) => <PostJobsCard key={i} item={ele} />)
          : Array.from(Array(4).keys()).map((item, index) => {
              return <PostJobsCardLoader key={index} />;
            })}
      </CardsContainer>
      <div
        className="relative w-full p-3 md:p-6 lg:p-12 min-h-[250px]"
        style={{
          backgroundImage: "url('/src/assets/banner2.jpg')",
          backgroundPosition: "center",
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

const Banner = ({ total_users }) => {
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
                />
                <button className="absolute right-2 bg-greenColor p-2 rounded-md">
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
      <div className="flex flex-wrap flex-col md:flex-row justify-center items-center gap-[24px]">
        {children}
      </div>
    </div>
  );
};

export default Homepage;
