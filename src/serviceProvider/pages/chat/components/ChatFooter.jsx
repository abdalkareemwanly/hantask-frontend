import { BsSendFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

const ChatFooter = () => {
  return (
    <>
      <textarea
        type="text"
        className="w-[80%] border border-mainBorder resize-none  rounded-lg  bg-background-color outline-none "
      />
      <div className="flex gap-2 items-center">
        <span className="w-[43px] h-[43px] flex items-center justify-center rounded-full  bg-blueColor cursor-pointer text-white">
          <GoPlus size={"30"} />
        </span>
        <span className="w-[43px] h-[43px] flex items-center justify-center rounded-full  bg-greenColor cursor-pointer text-white">
          <BsSendFill size={"23"} />
        </span>
      </div>
    </>
  );
};

export default ChatFooter;
