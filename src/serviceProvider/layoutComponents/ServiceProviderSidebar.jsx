// import React from 'react'
import { useEffect, useState } from "react";
import { BiSolidMessageRoundedDetail, BiSolidHome } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";

import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../../contexts/ContextsProvider";
import { useTWThemeContext } from "../../admin/Components/ThemeProvider";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { MdReviews } from "react-icons/md";
import { BiSolidBellRing } from "react-icons/bi";
import { logoDark, logoLight } from "../../images";
import { MdBookmarkAdded } from "react-icons/md";

const iconMap = {
  Dashboard: <BiSolidHome />,
  "Live Chat": <BiSolidMessageRoundedDetail />,
  profile: <BsPersonFill />,
  services: <MdMiscellaneousServices />,
  jobs: <MdWork size={20} />,
  orders: <BsListTask size={20} />,
  acceptedOrders: <FaTasks size={20} />,
  reports: <GoReport size={20} />,
  reviews: <MdReviews size={20} />,
  "verify account": <MdVerifiedUser size={20} />,
  notifications: <BiSolidBellRing size={20} />,
  "saved deals": <MdBookmarkAdded size={20} />,
};

export default function ServiceProviderSidebar({ setSidebarOpen }) {
  const { translation } = useStateContext();
  const [sideList, setSideList] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    getSideBar();
  }, []);

  const getSideBar = () => {
    fetch("/json/serviceProvider/sidebarList.json")
      .then((response) => response.json())
      .then((data) => {
        setSideList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const { theme } = useTWThemeContext();

  const handleCloseSideBar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className="w-full  sticky top-0 bg-inherit px-3 py-[20px] bg-blocks-color flex items-center justify-between">
        {theme === "light" ? (
          <img
            onClick={() => nav("/")}
            src={logoLight}
            className="w-[80%] cursor-pointer md:w-full"
            alt="Logo"
          />
        ) : (
          <img
            onClick={() => nav("/")}
            src={logoDark}
            className="w-[80%] cursor-pointer md:w-full"
            alt="Logo"
          />
        )}
        <span className="md:hidden cursor-pointer" onClick={handleCloseSideBar}>
          <AiOutlineClose size={27} />
        </span>
      </div>
      {Object.entries(sideList).map(([title, sublist]) => {
        return (
          <div key={title} id="sidebar">
            <NavLink
              className="flex flex-row w-full items-center hover:bg-hard-gray-color hover:bg-background-color transition-all duration-400 ease-in-out "
              to={`/serviceProvider/${sublist.path}`}
            >
              {Object.entries(iconMap).map(([index, value]) =>
                index === title ? (
                  <strong className="m-3" key={index}>
                    {value}
                  </strong>
                ) : null
              )}
              <strong className="m-1 text-primary-text">
                {title in translation ? translation[title] : title}
              </strong>
            </NavLink>
          </div>
        );
      })}
    </>
  );
}
