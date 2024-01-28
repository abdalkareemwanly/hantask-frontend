import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import RecentOrdersItemInformation from "./RecentOrderItemInformation";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function RecentOrdersItem({ item }) {
  try {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <div className="p-[20px] mb-[24px] border border-light-text rounded-[10px] ">
          <div className="flex justify-between">
            <div className="recent-order-info flex gap-[12px]">
              <div className="w-[120px] h-[120px] shrink-0">
                <img src="https://picsum.photos/200/300" className="w-[120px] h-[120px] rounded-[10px] object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <Link to={item.orderLink} className="text-blueColor hover:text-orangeColor duration-[500ms]">
                  Order id: {item.orderId}
                </Link>
                <Link to={item.orderLink} className="text-primary-text">
                  {item.orderName}
                </Link>
                <p className="text-light-text">
                  <span>Order Date: </span>
                  <strong>{item.orderDate}, </strong>
                  <span>Seller: </span>
                  <Link to={item.sellerProfileLink} className="text-primary-text">
                    {item.sellerName}
                  </Link>
                </p>
              </div>
            </div>
            <div className="recent-order-options flex justify-center items-center">
              <Link to={item.orderLink} className="w-[40px] h-[40px] rounded-full border border-light-text flex justify-center items-center hover:bg-orangeColor text-light-text hover:text-primary-text duration-[500ms] cursor-pointer">
                <FaEye />
              </Link>
              <motion.div initial={{ rotate: 0 }} animate={isOpened ? { rotate: "180deg" } : { rotate: 0 }}>
                <MdOutlineKeyboardArrowDown className="text-primary-text cursor-pointer text-[30px]" onClick={() => setIsOpened(!isOpened)} />
              </motion.div>
            </div>
          </div>
          <AnimatePresence>
            {isOpened && (
              <motion.div initial={{ height: 0, originY: 0 }} animate={{ height: "max-content", originY: 0 }} exit={{ height: 0, originY: 0 }} className="border-t border-light-text mt-[24px] pt-[24px]" style={{ overflow: "hidden" }}>
                <RecentOrdersItemInformation title={"Booking Date & Time"} value={item.bookingDateAndTime} />
                <RecentOrdersItemInformation title={"Order type"} value={item.orderType} />
                <RecentOrdersItemInformation title={"Order amount"} value={item.orderAmount + "$"} />
                <RecentOrdersItemInformation
                  title={"Order Status"}
                  value={
                    <Link to={"#"} className="flex justyify-center items-center bg-blueColorAlpha text-blueColorAlpha rounded-[30px] py-[5px] px-[15px] border border-blueColorAlpha" style={{ "--tw-bg-opacity": ".15" }}>
                      {item.orderStatus}
                    </Link>
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
