// import React from 'react'
import { useEffect, useState } from "react";
import { BiSolidMessageRoundedDetail, BiSolidHome } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { MdReviews } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../../contexts/ContextsProvider";
import { useTWThemeContext } from "../../admin/Components/ThemeProvider";

const iconMap = {
  Dashboard: <BiSolidHome size={20} />,
  "Live Chat": <BiSolidMessageRoundedDetail size={20} />,
  profile: <BsPersonFill size={20} />,
  jobs: <MdWork size={20} />,
  orders: <BsListTask size={20} />,
  acceptedOrders: <FaTasks size={20} />,
  reports: <GoReport size={20} />,
  reviews: <MdReviews size={20} />,
};

export default function CustomerSidebar({ setSidebarOpen }) {
  const { translation } = useStateContext();
  const [sideList, setSideList] = useState({});

  useEffect(() => {
    getSideBar();
  }, []);

  const getSideBar = () => {
    fetch("/src/customer/layoutComponents/sidebarList.json")
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
      <div className="w-full sticky top-0 bg-inherit px-3 py-[20px] bg-blocks-color flex items-center justify-between">
        {theme === "light" ? (
          <img
            src="/src/images/logo-light.png"
            className="w-[80%] md:w-full"
            alt="Logo"
          />
        ) : (
          <img
            src="/src/images/logo-dark.png"
            className="w-[80%] md:w-full"
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
              className="flex flex-row w-full items-center hover:bg-hard-gray-color hover:bg-background-color transition-all duration-400 ease-in-out"
              to={`${sublist.path}`}
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
