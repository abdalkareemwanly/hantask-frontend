import { formatMoney } from "../../../../functions/price";
import { FaRegBookmark } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbCalendarTime } from "react-icons/tb";
import Button from "../../../../Components/Button";
import axiosClient from "../../../../axios-client";

function PostJobsCard({ item, withBuyer = true }) {
  const saveToSaved = async (id) => {
    const res = await axiosClient.post("/site/post/saved", { post_id: id });
    console.log(res);
  };

  return (
    <div className="flex flex-col gap-2 w-[400px] py-3 px-6 component-shadow border rounded-lg">
      <div className="flex justify-between items-center">
        <span className="rounded-full text-sm px-3 bg-[#9feaba78] flex justify-center items-center">
          category name
        </span>
        <span
          onClick={() => saveToSaved(item.id)}
          className="w-[30px] h-[30px] cursor-pointer rounded-full bg-[#9feaba78] flex justify-center items-center"
        >
          <FaRegBookmark size={18} />
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center bg-[#9feaba78]">
          <img
            className="w-full h-full rounded-full"
            src={import.meta.env.VITE_WEBSITE_URL + item.image}
          />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="font-semibold">{item?.title}</h3>
          <div className="flex items-center gap-4 text-sm">
            <span>{item?.buyer_name}</span>
            <span className=" w-[1px] h-[16px] bg-black block"></span>
            <span className="flex gap-1 items-center">
              <FaLocationDot size={14} /> city
            </span>
          </div>
        </div>
      </div>
      <div className="text-gray-600 text-sm my-4">{item?.description}</div>
      <div className="border-t flex items-center py-2 justify-between">
        <div className="flex items-center gap-1  text-sm">
          <TbCalendarTime size={22} />
          <span>deadline: {item?.dead_line}</span>
        </div>
        <Button
          textColor={"white"}
          isLink={true}
          goto={`/deal/${item?.id}`}
          title={"show"}
          color={"bg-greenColor text-xs"}
        />
      </div>
    </div>
  );
}

export default PostJobsCard;
