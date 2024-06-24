import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiShareFill } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { BsFillSendFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { banner1 } from "../../../assets";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import moment from "moment";
import WebsiteLoader from "../../components/loader/WebsiteLoader";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getBlog = async (paramId) => {
  const res = await axiosClient.get(`/site/blogs/show/${paramId}`);
  return res.data.data;
};
const Blog = () => {
  const paramId = useParams().id;
  console.log(paramId);
  const {
    data: blog,
    isLoading,
    isError,
  } = useQueryHook(["blog", paramId], () => getBlog(paramId), "normal");
  // Parse the date string using Moment.js
  const formattedDate = moment(blog?.created_at).format("MMM DD, YYYY");
  // const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  // const [comments, setComments] = useState([
  //   { id: 1, text: "comment 1" },
  //   { id: 2, text: "comment 2" },
  //   { id: 3, text: "comment 2" },
  //   { id: 4, text: "comment 2" },
  //   { id: 5, text: "comment 2" },
  //   { id: 6, text: "comment 2" },
  //   { id: 7, text: "comment 2" },
  //   { id: 8, text: "comment 2" },
  //   { id: 9, text: "comment 2" },
  //   { id: 10, text: "comment 2" },
  // ]);
  const path = window.location.href;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(path)
      .then(() => {
        toast.success("link copied successfully");
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  // const isUserLogin = localStorage.getItem("ACCESS_TOKEN");
  // const [isLoading, setIsLoading] = useState(false);
  // const commentsContainerRef = useRef(null);

  // const [comment, setComment] = useState("");

  // // Dummy function to simulate fetching more comments
  // const fetchMoreComments = async () => {
  //   console.log("hello");
  //   // Simulating a delay for fetching data (replace with your actual fetch call)
  //   setIsLoading(true);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   // Dummy data to simulate fetching
  //   const newComments = [
  //     { id: comments.length + 1, text: "New comment 1" },
  //     { id: comments.length + 2, text: "New comment 2" },
  //   ];

  //   setComments((prevComments) => [...prevComments, ...newComments]);
  //   setIsLoading(false);
  // };

  // const handleScroll = () => {
  //   const container = commentsContainerRef.current;
  //   // console.log(container.scrollTop + container.clientHeight);
  //   // console.log(container.scrollHeight - 3);
  //   if (
  //     container.scrollTop + container.clientHeight >=
  //     container.scrollHeight - 1 // Adjust this threshold as needed
  //   ) {
  //     console.log("fetch");
  //     fetchMoreComments();
  //   } else {
  //     console.log("no fetch");
  //   }
  // };
  // useEffect(() => {
  //   if (commentsContainerRef.current) {
  //     commentsContainerRef.current.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     if (commentsContainerRef.current) {
  //       commentsContainerRef.current.removeEventListener(
  //         "scroll",
  //         handleScroll
  //       );
  //     }
  //   };
  // }, []);
  if (isError) return <NetworkErrorComponent />;
  if (isLoading)
    return (
      <div className="min-h-[100vh]">
        <WebsiteLoader />
      </div>
    );
  return (
    <div className="my-6 flex flex-col gap-4  lg:px-64 md:px-12  px-6 py-12">
      <h2 className="text-2xl font-bold ">{blog?.title}</h2>
      <div id="head-blog" className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <FacebookShareButton url={path}>
            <button className="bg-gray-300 rounded-full flex items-center justify-center w-[32px] h-[32px] text-white">
              <FaFacebookF size={18} />
            </button>
          </FacebookShareButton>
          <TwitterShareButton url={path}>
            <button className="bg-gray-300 rounded-full flex items-center justify-center w-[32px] h-[32px] text-white">
              <FaTwitter size={18} />
            </button>
          </TwitterShareButton>
          <button
            onClick={handleCopy}
            className="bg-gray-300 rounded-full flex items-center justify-center w-[32px] h-[32px] text-white"
          >
            <RiShareFill size={18} />
          </button>
        </div>
      </div>
      <main className="flex flex-col gap-4">
        <img
          className="w-full max-h-[450px] group-hover:scale-105 transition-all rounded-lg component-shadow object-cover "
          src={import.meta.env.VITE_WEBSITE_URL + "/" + blog.image}
        />
        <div className="text-gray-400">{blog.meta_description}</div>
        <div
          className="py-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        ></div>
      </main>
    </div>
  );
};

export default Blog;
