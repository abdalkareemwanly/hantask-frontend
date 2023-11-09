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
import Logo from "./Logo";
import { ContextProvider, useStateContext } from "../../contexts/ContextsProvider";

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

export default function SidebarAdmin() {
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const { translation } = useStateContext();
  const [listName, setListName] = useState(null);
  const [sideList, setSideList] = useState({});

  const getdropdownopen = (name) => {
    if (DropdownOpen === false) {
      setDropdownOpen(true);
      setListName(name);
    } else {
      if (listName === name) {
        setDropdownOpen(false);
      } else {
        setListName(name);
      }
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

  return (
    <>
      <h2 className="w-full sticky top-0 bg-inherit px-5 py-[20px] bg-blocks-color ">
        <Logo />
      </h2>

      {Object.entries(sideList).map(([title, sublist]) => (
        <div key={title}>
          {sublist && typeof sublist === "object" && sublist.name === null ? (
            <Link
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
              <strong className="m-1 text-black">{title in translation ? translation[title] : title}</strong>
            </Link>
          ) : (
            <div>
              <button
                className="flex flex-row w-full items-center hover:bg-background-color transition-all duration-400 ease-in-out"
                title="User Tools"
                onClick={() => getdropdownopen(title)}
              >
                <div className="flex grow items-center">
                  {Object.entries(iconMap).map(([index, value]) =>
                    index === title ? (
                      <strong className="m-3" key={index}>
                        {value}
                      </strong>
                    ) : null
                  )}
                  <strong
                    className={listName === title ? "ms-1 text-danger" : "ms-1"}
                  >
                      { title in translation? translation[title]: title }
                  </strong>
                </div>
                <div className="me-3">
                  {DropdownOpen === true && listName === title ? (
                    <BiSolidChevronUp />
                  ) : (
                    <BiSolidChevronDown />
                  )}
                </div>
              </button>
              <div
                className={
                  DropdownOpen === true && listName === title
                    ? "flex flex-col"
                    : "hidden"
                }
              >
                {sublist &&
                  Object.entries(sublist).map(([k, val]) => (
                    <Link
                      key={k}
                      className="py-[10px] px-[43px] hover:bg-background-color active:bg-background-color focus:bg-background-color transition-all duration-400 ease-in-out"
                      to={`${val}`}
                    >
                      {k in translation ? translation[k] : k}
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
