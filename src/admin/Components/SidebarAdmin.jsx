// import React from 'react'
import { useEffect, useState } from "react";
import {
  BiSolidMessageDetail,
  BiSolidMessageRoundedDetail,
  BiSolidArrowFromRight,
  BiSolidCategory,
  BiSolidFile,
  BiSolidUser,
  BiSolidHome,
  BiSolidDirections,
  BiSolidChevronDown,
  BiSolidChevronUp,
  BiSolidBriefcaseAlt2,
  BiSolidDollarCircle,
  BiSolidCreditCard,
  BiSolidServer,
  BiSolidMap,
  BiSolidTachometer,
  BiSolidEnvelope,
  BiSolidBellRing,
  BiSolidGift,
  BiSolidTruck,
  BiSolidLayout,
  BiSolidCog,
  BiSolidObjectsHorizontalCenter,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useTWThemeContext } from "./ThemeProvider";
import { AiOutlineClose } from "react-icons/ai";

const iconMap = {
  Dashboard: <BiSolidHome />,
  "Live Chat": <BiSolidMessageRoundedDetail />,
  Blogs: <BiSolidMessageDetail />,
  Subscription: <BiSolidObjectsHorizontalCenter />,
  Jobs: <BiSolidBriefcaseAlt2 />,
  Wallet: <BiSolidDollarCircle />,
  "Admin Role Manage": <BiSolidUser />,
  "Admin Services": <BiSolidUser />,
  "Users Manage": <BiSolidUser />,
  "Seller Settings": <BiSolidUser />,
  "Seller Buyer Report": <BiSolidUser />,
  Pages: <BiSolidFile />,
  Categories: <BiSolidCategory />,
  "Sub Category": <BiSolidCategory />,
  "Child Categories": <BiSolidCategory />,
  Brands: <BiSolidCreditCard />,
  "Service Country": <BiSolidMap />,
  "Service City": <BiSolidMap />,
  "Service Area": <BiSolidMap />,
  Tax: <BiSolidTachometer />,
  Services: <BiSolidServer />,
  Orders: <BiSolidTruck />,
  Tickets: <BiSolidGift />,
  Notifications: <BiSolidBellRing />,
  "Email Template Settings": <BiSolidEnvelope />,
  "Form Builder": <BiSolidLayout />,
  "Appearance Settings": <BiSolidLayout />,
  "Other Page Settings": <BiSolidLayout />,
  "General Settings": <BiSolidCog />,
  Languages: <BiSolidDirections />,
  "Back To Site": <BiSolidArrowFromRight />,
};

export default function SidebarAdmin({ setSidebarOpen }) {
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [listName, setListName] = useState(null);
  const [sideList, setSideList] = useState({});
  const getdropdownopen = (name) => {
    if (DropdownOpen === false) {
      setDropdownOpen(true);
      setListName(name);
    } else {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    getSideBar();
  }, []);

  const getSideBar = () => {
    fetch("/src/admin/Json/adminList.json")
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
            src="/public/images/logo-light.png"
            className="w-[80%] md:w-full"
            alt="Logo"
          />
        ) : (
          <img
            src="/public/images/logo-dark.png"
            className="w-[80%] md:w-full"
            alt="Logo"
          />
        )}
        <span className="md:hidden cursor-pointer" onClick={handleCloseSideBar}>
          <AiOutlineClose size={27} />
        </span>
      </div>

      {Object.entries(sideList).map(([key, value]) =>
        value == null ? (
          <Link
            key={key}
            className="flex flex-row w-full items-center"
            to={`/admin/${key}`}
          >
            {Object.entries(iconMap).map(([index, value]) =>
              index === key ? (
                <strong key={key} className="m-3 ">
                  {value}
                </strong>
              ) : null
            )}
            <strong className="m-1 ">{key}</strong>
          </Link>
        ) : (
          <div key={key}>
            <button
              className="flex flex-row w-full items-center"
              title="User Tools"
              onClick={() => getdropdownopen(key)}
            >
              <div className="flex grow items-center ">
                {Object.entries(iconMap).map(([index, value]) =>
                  index === key ? (
                    <strong key={key} className="m-3">
                      {value}
                    </strong>
                  ) : null
                )}
                <strong
                  className={listName === key ? "ms-1 text-danger" : "ms-1 "}
                >
                  {key}
                </strong>
              </div>
              <div className="me-3">
                {DropdownOpen === true && listName === key ? (
                  <BiSolidChevronUp />
                ) : (
                  <BiSolidChevronDown />
                )}
              </div>
            </button>
            {DropdownOpen === true && listName === key ? (
              <div className="flex flex-col">
                {Object.entries(value).map(([k, val]) => (
                  <Link
                    key={k}
                    className="py-[10px] px-[43px] hover:bg-greenBtn hover:text-white focus:font-extrabold focus:bg-hard-gray-color"
                    to={`/admin/${val}`}
                  >
                    {val}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )
      )}
    </>
  );
}
