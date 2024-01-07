import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { RiMenuFill } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const controls1 = useAnimation();
  const handleHover = () => {
    controls.start({ opacity: 1, y: 0 });
  };

  const handleHoverExit = () => {
    controls.start({ opacity: 0, y: 10 });
  };
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center relative lg:py-12 lg:px-20 md:py-6 md:px-12 py-8 px-6 bg-[#f5f7ff]">
      <Link>
        <img src="/src/images/logo-light.png" className="w-48" alt="Logo" />
      </Link>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="hidden md:block">
        <AnimatePresence>
          <motion.div onHoverStart={handleHover} onHoverEnd={handleHoverExit} className="relative">
            <p className="flex items-center gap-2">
              Account <IoPersonOutline />
            </p>
            <motion.div animate={controls} initial={{ opacity: 0, y: 10 }} className="flex flex-col gap-3  p-3 rounded-md component-shadow min-w-[150px] absolute right-0" transition={{ duration: 0.2 }}>
              <motion.ul>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
                {/* Add more links as needed */}
              </motion.ul>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* small screens  */}
      <div className="md:hidden flex gap-2 items-center">
        <AnimatePresence>
          <motion.div onHoverStart={handleHover} onHoverEnd={handleHoverExit} className="relative">
            <p className="flex items-center gap-2">
              <IoPersonOutline size={25} />
            </p>
            <motion.div animate={controls} initial={{ opacity: 0, y: 10 }} className="flex flex-col gap-3  p-3 rounded-md component-shadow min-w-[150px] absolute right-0" transition={{ duration: 0.2 }}>
              <motion.ul>
                <li>
                  <span>hi</span>
                </li>
                <li>
                  <a href="#">Link 2</a>
                </li>
                {/* Add more links as needed */}
              </motion.ul>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <span>
          <RiMenuFill size={25} onClick={handleClick} />
        </span>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }} className="absolute left-0 top-20 bg-black w-full text-white flex flex-col gap-2 z-10 ">
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
            <Link>home</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
