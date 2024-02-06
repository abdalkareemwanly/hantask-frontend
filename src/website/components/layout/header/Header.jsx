import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { RiMenuFill } from "react-icons/ri";
import { useStateContext } from "../../../../contexts/ContextsProvider";
import { BiSolidChevronDown } from "react-icons/bi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const user = JSON.parse(localStorage.getItem("USER"));
  const mode = localStorage.getItem("theme");
  const controls1 = useAnimation();
  const handleHover = () => {
    controls.start({ opacity: 1, y: 10 });
  };

  const handleHoverExit = () => {
    controls.start({ opacity: 0, y: 20 });
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
        {user ? (
          <Link
            to={
              user.user_type === "buyer"
                ? "/customer/home"
                : user.user_type === "seller"
                ? "serviceProvider/home"
                : "admin/dashboard"
            }
            className="flex  items-center px-[25px] py-[24px] w-[220px] justify-end"
          >
            {mode === "light" ? (
              <img
                className="w-[30px]"
                src="/src/images/user-light.png"
                alt=""
              />
            ) : (
              <img
                className="w-[30px]"
                src="/src/images/user-dark.png"
                alt=""
              />
            )}
            <div className=" px-3">{user.username}</div>
          </Link>
        ) : (
          <AnimatePresence>
            <motion.div
              onHoverStart={handleHover}
              onHoverEnd={handleHoverExit}
              className="relative"
            >
              <p className="flex items-center gap-2">
                Account <IoPersonOutline />
              </p>
              <motion.div
                animate={controls}
                initial={{ opacity: 0, y: 20 }}
                className="p-3 rounded-md component-shadow min-w-[150px] absolute right-0 bg-white"
                transition={{ duration: 0.2 }}
              >
                <motion.ul className="flex flex-col gap-2 ">
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>Register</Link>
                  </li>
                </motion.ul>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {/* small screens  */}
      <div className="md:hidden flex gap-2 items-center">
        <AnimatePresence>
          <motion.div
            onHoverStart={handleHover}
            onHoverEnd={handleHoverExit}
            className="relative"
          >
            <p className="flex items-center gap-2">
              <IoPersonOutline size={23} />
            </p>
            <motion.div
              animate={controls}
              initial={{ opacity: 0, y: 20 }}
              className="p-3 rounded-md component-shadow min-w-[150px] absolute right-0 bg-white"
              transition={{ duration: 0.2 }}
            >
              <motion.ul className="flex flex-col gap-2 ">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
            className="absolute left-0 top-20 bg-white w-full text-black component-shadow flex flex-col gap-2 z-[1000] p-4 "
          >
            <nav className="flex items-center flex-col gap-8">
              <Link to={""}>home</Link>
              <Link to={"/about"}>about</Link>
              <Link to={"/subscription"}>subscription</Link>
              <Link to={"/policy"}>policy</Link>
              <Link to={"/condition"}>condition</Link>
              <Link to={"/contact"}>contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
