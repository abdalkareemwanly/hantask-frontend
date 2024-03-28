import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import RecentOrdersItemInformation from "./RecentOrderItemInformation";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatMoney } from "./../../../../functions/price";

function RecentOrdersItem({ item }) {
  try {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <div className="p-[20px] mb-[24px] border border-light-text rounded-[10px] ">
          <div className="flex justify-between">
            <div className="recent-order-info flex gap-[12px]">
              <div className="w-[120px] h-[120px] shrink-0">
                <img
                  src={import.meta.env.VITE_WEBSITE_URL + item?.post_image}
                  className="w-[120px] h-[120px] rounded-[10px] object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <Link
                  to={item.orderLink}
                  className="text-blueColor hover:text-orangeColor duration-[500ms]"
                >
                  Order id: {item.id}
                </Link>
                <Link to={item.orderLink} className="text-primary-text">
                  {item.orderName}
                </Link>
                <p className="text-light-text">
                  <span>Order Date: </span>
                  <strong>{item.created_at.slice(0, 10)}, </strong>
                  <span>handyman: </span>
                  <Link
                    target="_blank"
                    to={`/seller-profile/${item?.seller_id}`}
                    className="text-primary-text"
                  >
                    {item.seller_name}
                  </Link>
                </p>
              </div>
            </div>
            <div className="recent-order-options flex justify-center items-center">
              {/* <Link
                to={item.orderLink}
                className="w-[40px] h-[40px] rounded-full border border-light-text flex justify-center items-center hover:bg-orangeColor text-light-text hover:text-primary-text duration-[500ms] cursor-pointer"
              >
                <FaEye />
              </Link> */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={isOpened ? { rotate: "180deg" } : { rotate: 0 }}
              >
                <MdOutlineKeyboardArrowDown
                  className="text-primary-text cursor-pointer text-[30px]"
                  onClick={() => setIsOpened(!isOpened)}
                />
              </motion.div>
            </div>
          </div>
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ height: 0, originY: 0 }}
                animate={{ height: "max-content", originY: 0 }}
                exit={{ height: 0, originY: 0 }}
                className="border-t border-light-text mt-[24px] pt-[24px]"
                style={{ overflow: "hidden" }}
              >
                <RecentOrdersItemInformation
                  title={"dead line date"}
                  value={item.dead_line}
                />
                {/* <RecentOrdersItemInformation
                  title={"Order type"}
                  value={item.orderType}
                /> */}
                <RecentOrdersItemInformation
                  title={"Order amount"}
                  value={formatMoney(Number(item.budget))}
                />
                <RecentOrdersItemInformation
                  title={"Order Status"}
                  value={
                    <div
                      className={`p-1 rounded-md ${
                        item.workStatus == 1
                          ? "border border-blueColor text-blueColor bg-blueColor bg-opacity-20"
                          : item.workStatus == 2
                          ? "border border-orangeColor text-orangeColor bg-orangeColor bg-opacity-20"
                          : item.workStatus == 3
                          ? "border border-greenColor text-greenColor bg-greenColor bg-opacity-20"
                          : "border border-redColor text-redColor bg-redColor bg-opacity-20 "
                      }`}
                    >
                      {item.workStatus == 1
                        ? "in proccess"
                        : item.workStatus == 2
                        ? "in progress"
                        : item.workStatus == 3
                        ? "completed"
                        : "canceled"}
                    </div>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RecentOrdersItem;
