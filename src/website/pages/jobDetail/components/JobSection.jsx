import { Link } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import "../style/JobSection.css";
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import ModalContainer from "../../../../Components/ModalContainer";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa";
import axiosClient from "../../../../axios-client";
import { toast } from "react-toastify";
import { MdAttachMoney } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { formatMoney } from "../../../../functions/price";

const PrevBTN = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute bg-greenColor transition-all text-white-color    cursor-pointer    z-10  w-[35px] h-[35px]  top-[-48px] right-14 flex items-center justify-center rounded-full "
    >
      <GrFormPrevious size={40} />
    </div>
  );
};

const NextBTN = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute bg-greenColor text-white-color    transition-all cursor-pointer   w-[35px] h-[35px] top-[-48px]  right-2  flex items-center justify-center rounded-full  "
    >
      <GrFormNext size={40} />
    </div>
  );
};

function JobSection({ data }) {
  const [selectedImage, setSelectedImage] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    // centerMode: true,
    draggable: false,
    slidesToScroll: 1,
    prevArrow: <PrevBTN />,
    nextArrow: <NextBTN />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          dots: true,
          infinite: true,
          speed: 500,
          // centerMode: true,
          draggable: false,
          slidesToScroll: 1,
          prevArrow: <PrevBTN />,
          nextArrow: <NextBTN />,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          dots: false,
          infinite: true,
          speed: 500,
          // centerMode: true,
          draggable: false,
          slidesToScroll: 1,
          prevArrow: <PrevBTN />,
          nextArrow: <NextBTN />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: false,
          infinite: true,
          speed: 500,
          // centerMode: true,
          draggable: false,
          slidesToScroll: 1,
          prevArrow: <PrevBTN />,
          nextArrow: <NextBTN />,
        },
      },
    ],
  };
  const isUser = localStorage.getItem("ACCESS_TOKEN");
  const isUserSeller =
    JSON.parse(localStorage.getItem("USER"))?.user_type == "seller";
  console.log(data);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    const groupedDataInitial = [];

    data?.questions.forEach((item) => {
      const { question_id, question_type } = item;
      if (question_type === "multiplechoise") {
        const existingItem = groupedDataInitial.find(
          (groupedItem) => groupedItem.question_id === question_id
        );
        if (!existingItem) {
          groupedDataInitial.push({
            ...item,
            form_answer: item.form_answer,
            buyer_answer: item.buyer_answer.answer_id
              ? {
                  ...item.buyer_answer,
                  answers: [item.buyer_answer.answer_id],
                }
              : item.buyer_answer,
          });
        } else {
          existingItem.form_answer.push(item.form_answer);
          if (item.buyer_answer.answer_id) {
            existingItem.buyer_answer.answers.push(item.buyer_answer.answer_id);
          }
        }
      } else {
        groupedDataInitial.push(item);
      }
    });
    setGroupedData(groupedDataInitial);
  }, [data]);
  console.log(groupedData);
  const isServiceProvider =
    JSON.parse(localStorage.getItem("USER"))?.user_type === "seller";
  const saveToSaved = async () => {
    const isLogin = localStorage.getItem("ACCESS_TOKEN");
    if (isLogin) {
      if (isServiceProvider) {
        const res = await axiosClient.post("/site/post/saved", {
          post_id: data.id,
        });
        toast.success("saved successfully");
      } else {
        toast.info("only for handymans");
      }
    } else {
      toast.info("you need to login first!");
    }
  };
  return (
    <div className=" flex flex-col gap-8 ">
      {isModalOpen && (
        <ModalContainer
          type={"site"}
          setIsModalOpen={setIsModalOpen}
          component={
            <div className="w-[600px] h-[500px] rounded-lg">
              <img
                className="w-full h-full rounded-lg"
                src={import.meta.env.VITE_WEBSITE_URL + selectedImage?.image}
              />
            </div>
          }
        />
      )}

      <div
        id="top-deal-sec"
        className="flex md:justify-between md:items-center md:flex-row flex-col bg-[#ebf0f7] lg:px-[9%] md:px-[7%] px-[2%] p-8"
      >
        <div className="flex items-center gap-4 ">
          <div className="rounded-lg w-[120px] h-[120px] p-2 bg-[#d7eae1]">
            <img
              src={import.meta.env.VITE_WEBSITE_URL + data?.image}
              className="w-full h-full rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-2xl">{data?.title}</h3>
            <div className="flex gap-2 items-center">
              <span>{data?.buyer_name}</span> <span>|</span>
              <span className="flex items-center gap-1">
                <IoLocationOutline size={20} color="#1c8397" />
                {data?.country_name + ", " + data?.city_name}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <IoTimeOutline size={20} color="#1c8397" />
                {data?.created_at.slice(0, 10)}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <IoEyeOutline size={20} color="#1c8397" />
                {data?.view_post_count}
              </span>
            </div>
            <div>
              <span className="rounded-lg p-2 font-semibold bg-[#d7eae1]">
                {data?.category_name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isUser ? (
            <Link to={"/login"}>
              <SubmitButton
                text={"Login To Apply"}
                notSubmit={true}
                onClick={() => {}}
              />
            </Link>
          ) : isUserSeller ? (
            !data?.dataComment ? (
              <Link to={"/apply-job"} state={{ postData: data }}>
                <SubmitButton text={"Apply now"} notSubmit={true} />
              </Link>
            ) : (
              <SubmitButton text={"already Applied"} notSubmit={true} />
            )
          ) : (
            ""
          )}
          {isUserSeller ? (
            <button
              onClick={saveToSaved}
              className="bg-[#d7eae1] p-2 rounded-md"
            >
              {data?.saved_post ? (
                <FaBookmark size={24} color="#1c8397" />
              ) : (
                <CiBookmark size={24} color="#1c8397" />
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  lg:px-[9%] md:px-[7%] px-[2%]">
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="w-full">
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-2 col-span-1 lg:col-span-2">
                <div>
                  <img
                    className="rounded-md w-full h-[350px] object-cover"
                    src={import.meta.env.VITE_WEBSITE_URL + data?.image}
                  />
                </div>
                <div className="w-full slider-contiainer">
                  <Slider {...settings}>
                    {data?.postimages?.map((image, i) => (
                      <div key={i}>
                        <div
                          onClick={() => {
                            setSelectedImage(image);
                            setIsModalOpen(!isModalOpen);
                          }}
                          className="w-[100%] p-2 h-[350px] sm:h-[300px] lg:h-[200px] "
                        >
                          <img
                            className="rounded-xl w-full h-full object-cover"
                            src={
                              import.meta.env.VITE_WEBSITE_URL + image?.image
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-2xl">deal description</h3>
          <p className="text-gray-500">{data?.description}</p>
        </div>
        <div className="col-span-1 lg:col-span-1 h-fit p-4 bg-[#ebf0f7] rounded-md flex flex-col gap-4">
          <h3 className="text-2xl font-bold">deal overview</h3>
          <div className="flex items-center gap-4 mt-4">
            <FaMoneyBillTrendUp size={24} color="#1c8397" />
            <div>{formatMoney(Number(data?.budget))}</div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <FaLocationDot size={24} color="#1c8397" />
            <div>{data?.country_name + ", " + data?.city_name}</div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1">
              <BiSolidCategory size={24} color="#1c8397" />
            </div>
            <div className="flex category-con flex-col gap-2">
              <span>{data?.category_name}</span>
              <span>{data?.subcategory_name}</span>
              <span>{data?.childCategory_name}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <IoCalendarNumberSharp size={24} color="#1c8397" />
            <div>{data?.dead_line}</div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <RiQuestionAnswerFill size={24} color="#1c8397" />
            <div>{data?.country_name + ", " + data?.city_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSection;
