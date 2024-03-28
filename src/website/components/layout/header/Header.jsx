import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { RiMenuFill } from "react-icons/ri";
import { useStateContext } from "../../../../contexts/ContextsProvider";
import { BiSolidChevronDown } from "react-icons/bi";
import Button from "../../../../Components/Button";
import { MdOutlineAccountCircle } from "react-icons/md";
import { logoLight } from "../../../../images";

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
    <header className="py-6 lg:px-32 md:px-16 px-8 flex justify-between items-center">
      <Link>
        <img src={logoLight} className="w-[6rem] md:w-[9rem]" alt="Logo" />
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <div className="hidden items-center gap-6 text-sm md:flex">
          <Button
            title={"find handyman"}
            isLink={true}
            goto={"/postDeal"}
            color={"bg-greenColor"}
            textColor={"white"}
          />
          <div>
            <Button isLink={false} textColor={"black"} title={"homeowners"} />
          </div>
          <div>
            <Button isLink={false} textColor={"black"} title={"handymans"} />
          </div>
          <div className="h-[20px] w-[1px] bg-black"></div>
        </div>
        <div>
          <Button
            isLink={true}
            goto={
              user
                ? user.user_type === "seller"
                  ? "/serviceProvider/home"
                  : user.user_type === "buyer"
                  ? "/customer/home"
                  : "/admin/dashboard/"
                : "/login"
            }
            Icon={<MdOutlineAccountCircle fontSize={25} color="black" />}
            title={user ? user.name : "account"}
            textColor={"black"}
            color={"flex-row-reverse"}
          />
        </div>
        <span className="block md:hidden">
          <RiMenuFill size={25} onClick={handleClick} />
        </span>
      </div>
      {/* for small screen  */}
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
