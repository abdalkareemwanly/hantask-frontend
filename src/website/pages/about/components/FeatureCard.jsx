import { useState } from "react";
import { motion } from "framer-motion";

function FeatureCard({ color, name, text, icon }) {
  try {
    const [textColor, setTextColor] = useState("inherit");
    return (
      <>
        <motion.div initial={{ translateY: 0 }} whileHover={{ translateY: "-10px" }} className={`rounded-[10px] flex flex-col items-center gap-[20px] py-[30px] px-[20px]`} style={{ background: `rgba(${color}, .1)` }}>
          <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center text-white text-[40px]" style={{ background: `rgb(${color})` }}>
            {icon}
          </div>
          <div className={`text-[20px] text-primary-text font-[700] duration-[0.3s] transition-all ellipsis ellipsis-1 mb-0`} onMouseOver={() => setTextColor(`rgba(${color}`)} onMouseLeave={() => setTextColor("inherit")} style={{ color: textColor }}>
            {name}
          </div>
          <div className="mt-[20px] text-[14px] text-[var(--light-text)] text-center">{text}</div>
        </motion.div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default FeatureCard;
