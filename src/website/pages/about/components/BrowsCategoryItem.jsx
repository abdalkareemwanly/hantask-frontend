import { motion } from "framer-motion";

function BrowsCategoryItem({ color, icon, name, number }) {
  try {
    return (
      <>
        <motion.div initial={{ translateY: 0 }} whileHover={{ translateY: "-10px" }} className="w-[230px] rounded-[10px] text-white mb-[30px] flex flex-col items-center py-[30px] px-[10px] mx-[10px] gap-[20px] mt-[10px]" style={{ background: `rgb(${color})` }}>
          <div className="w-[60px] h-[60px] flex justify-center items-center text-[60px]">{icon}</div>
          <div className="font-[600] text-[24px] ellipsis ellipsis-1 ">{name}</div>
          <div className="text-[16px]">{number}+ Service</div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BrowsCategoryItem;
