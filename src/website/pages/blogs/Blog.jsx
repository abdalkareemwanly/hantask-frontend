import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiShareFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { banner1 } from "../../../assets";
const Blog = () => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, text: "comment 1" },
    { id: 2, text: "comment 2" },
    { id: 3, text: "comment 2" },
    { id: 4, text: "comment 2" },
    { id: 5, text: "comment 2" },
    { id: 6, text: "comment 2" },
    { id: 7, text: "comment 2" },
    { id: 8, text: "comment 2" },
    { id: 9, text: "comment 2" },
    { id: 10, text: "comment 2" },
  ]);
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

  const isUserLogin = localStorage.getItem("ACCESS_TOKEN");
  const [isLoading, setIsLoading] = useState(false);
  const commentsContainerRef = useRef(null);

  const [comment, setComment] = useState("");

  // Dummy function to simulate fetching more comments
  const fetchMoreComments = async () => {
    console.log("hello");
    // Simulating a delay for fetching data (replace with your actual fetch call)
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy data to simulate fetching
    const newComments = [
      { id: comments.length + 1, text: "New comment 1" },
      { id: comments.length + 2, text: "New comment 2" },
    ];

    setComments((prevComments) => [...prevComments, ...newComments]);
    setIsLoading(false);
  };

  const handleScroll = () => {
    const container = commentsContainerRef.current;
    // console.log(container.scrollTop + container.clientHeight);
    // console.log(container.scrollHeight - 3);
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 1 // Adjust this threshold as needed
    ) {
      console.log("fetch");
      fetchMoreComments();
    } else {
      console.log("no fetch");
    }
  };
  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.removeEventListener(
          "scroll",
          handleScroll
        );
      }
    };
  }, []);

  return (
    <div className="my-6 flex flex-col gap-4  lg:px-64 md:px-12  px-6 py-12">
      <h2 className="text-2xl font-bold ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </h2>
      <div id="head-blog" className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-gray-400">jan 14, 2024</span>
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
          className="w-full max-h-[350px] group-hover:scale-105 transition-all rounded-lg component-shadow object-cover"
          src={banner1}
        />
        <div className="p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quo,
          veniam laboriosam nihil, sed eveniet sit tempora amet explicabo a
          voluptate natus et, quam dicta! Odio deleniti natus magnam hic. Eos,
          veniam sit. Dignissimos nihil accusamus cum exercitationem maiores
          architecto atque natus ducimus nobis necessitatibus iusto, cumque
          ratione aperiam soluta quaerat, nisi officia possimus libero autem
          quisquam impedit. Eveniet, corporis! Provident possimus illum quasi
          doloremque, cumque dolore alias fugit error, sint voluptates iusto
          debitis veritatis at nobis. Pariatur maiores possimus atque placeat
          quae. Blanditiis perspiciatis ipsam at cupiditate! Mollitia, dicta.
          Unde inventore est nemo itaque ab dolor, ullam earum consequatur,
          veniam natus minima accusantium distinctio, amet a aspernatur
          blanditiis magni non id quae ex. Similique sed repudiandae ipsa facere
          nihil. Aut placeat sed temporibus eveniet numquam quidem, libero
          doloribus consequuntur possimus totam modi nam accusantium dolorum
          beatae molestias provident unde harum vitae tempora! Ad suscipit quae
          illum accusamus ex veniam? Illum pariatur nostrum, commodi quibusdam
          natus voluptas fugiat libero soluta reprehenderit maiores odio
          exercitationem totam possimus amet ratione repellat debitis dolor nemo
          impedit eius nobis. Sit minus ex at error! Beatae iure obcaecati
          incidunt! Voluptatibus ducimus ex cum doloribus nam aspernatur numquam
          tempore exercitationem, velit hic provident itaque, adipisci a. Quis
          consectetur sed voluptatibus necessitatibus incidunt non at, facilis
          unde? Necessitatibus, eligendi quod? Harum qui iusto reprehenderit
          sint esse cum in autem ab facilis eveniet placeat animi delectus fuga
          asperiores, atque quam? Assumenda deserunt soluta eos repellendus
          adipisci laudantium esse! Doloremque facilis alias quo repellat
          ratione vitae inventore et adipisci maxime, dolorum ad incidunt.
          Temporibus deleniti eaque, aliquid dolores accusantium molestiae
          cupiditate, ullam, reiciendis at modi omnis suscipit nihil quo? Nam
          dicta quaerat voluptatibus veniam, hic ab vel ex velit maiores autem
          est. Aut blanditiis, dolore maiores facere inventore, vel molestias
          amet quis eveniet illum veniam quaerat quod quam minima?
        </div>
      </main>
      <section id="comments-section">
        <div className=" border border-gray-200 rounded-md p-4">
          <div
            className="cursor-pointer"
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          >
            Comments
          </div>
          <div>
            <AnimatePresence>
              {isCommentsOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  ref={commentsContainerRef}
                  className="comments-container overflow-x-hidden overflow-y-auto p-4 max-h-[400px]"
                >
                  {/* Your comments container content here */}
                  {comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      className={`bg-gray-100 p-3 rounded-md mb-4`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 20 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {comment.text}
                    </motion.div>
                  ))}
                  {isLoading && <div className="loader">Loading...</div>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isUserLogin && (
            <div className="my-4 flex items-center gap-4">
              <input
                placeholder="comment..."
                type="text"
                className="input-box w-full"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="w-[38px] h-[38px] rounded-full bg-greenColor text-white flex items-center justify-center">
                <BsFillSendFill size={22} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
