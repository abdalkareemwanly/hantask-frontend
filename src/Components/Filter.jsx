import { useState } from "react";
import FilterField from "./FilterField";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";

function Filter({ state, dispatch, handleSearch }) {
  try {
    const [isOpened, setIsOpened] = useState(false);
    return (
      <>
        <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
          <div className=" flex justify-between border-b border-light-text  pb-[20px]">
            <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text flex">
              Search Report Module
              <motion.div initial={{ rotate: 0 }} animate={isOpened ? { rotate: "180deg" } : { rotate: 0 }} className="flex justify-center items-center">
                <MdOutlineKeyboardArrowDown className="text-primary-text cursor-pointer text-[30px]" onClick={() => setIsOpened(!isOpened)} />
              </motion.div>
            </h4>
            <Button
              isLink={false}
              Icon={<FaSearch />}
              title={"Search"}
              width={"max-content"}
              color={"bg-greenColor"}
              onClickFun={() => {
                handleSearch();
              }}
            />
          </div>
          <AnimatePresence>
            {isOpened && (
              <motion.div initial={{ height: 0, originY: 0 }} animate={{ height: "max-content", originY: 0 }} exit={{ height: 0, originY: 0 }} className={`grid lg:grid-cols-${(Math.min(Object.keys(state).length), 3)} md:grid-cols-${(Math.min(Object.keys(state).length), 2)} grid-cols-1 gap-8 mt-[20px]`} style={{ overflow: "hidden" }}>
                {Object.keys(state).map((itemKey, index) => {
                  return <FilterField dispatch={dispatch} type={state[itemKey].type} placeholder={state[itemKey].placeholder} name={itemKey} title={state[itemKey].title} />;
                })}
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

export default Filter;
