// import React from 'react'
import { Link, Outlet } from "react-router-dom";
import {
  BiMenuAltLeft,
  BiSolidBellRing,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
  BiSolidChevronDown,
} from "react-icons/bi";
import { useState } from "react";
import SidebarAdmin from "./SidebarAdmin";

//  // Define class names for light and dark mode
//  const lightsidebarClasses = "";
//  const darksidebarClasses = "";
//  const lightheaderClasses = "";
//  const darkheaderClasses = "";
//  const lightbodyClasses = "bg-light text-black";
//  const darkbodyClasses = "";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleMode = () => {
    document.documentElement.classList.toggle('dark');
  };
  const handleAdminMenu = () => {
    setAdminMenuOpen(!adminmenuOpen);
  };

  return (
    <div className={`flex flex-row h-screen`}>
      <div
        className={`flex flex-col h-screen bg-gray-color text-black shadow-black dark:bg-dark-color dark:text-white dark:shadow-white overflow-y-auto scroll rounded-tr-lg z-20 shadow-lg transition-all duration-500 ease-in-out ${
          sidebarOpen ? "w-[280px]" : "w-0"
        }`}
      >
        <SidebarAdmin />
      </div>
      <div className='flex flex-col grow'>
        <div
          className={`flex flex-row items-center bg-md-gray-color text-black shadow-[gray] dark:bg-hard-gray-color dark:text-white dark:shadow-[gray]  ml-[-15px] w-lg-[100.75%] w-sm-[100%] px-[30px] z-10 shadow-md`}
        >
          <button className="flex-none w-20" onClick={handleSideBar}>
            <BiMenuAltLeft style={{ fontSize: "24px" }} />
          </button>
          <div className="flex flex-row-reverse items-center grow">
            {/* admin Image And Menu */}
            <button
              className="flex flex-row items-center px-[25px] py-[24px] w-[160px] justify-between border-l border-[gray]"
              onClick={handleAdminMenu}
            >
                <img
                  className="w-[30px] block dark:hidden"
                  src="/public/images/user-light.png"
                  alt=""
                />
                <img
                  className="w-[30px] hidden dark:block"
                  src="/public/images/user-dark.png"
                  alt=""
                />
              <div>Admin</div>
              <BiSolidChevronDown style={{ fontSize: "18px" }} />
            </button>
            <div
              className={`absolute flex flex-col mt-[210px] w-[180px] overflow-y-auto me-[-20px] shadow-md ${
                adminmenuOpen ? "h-[auto]" : "h-0"
              }`}
            >
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color ">Edit Profile</Link>
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color">Password Change</Link>
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color">Logout</Link>
            </div>
            <button onClick={handleMode} className="me-5">
                <BiSolidBrightness className="img-fluid block dark:hidden" style={{ fontSize: "24px" }} />
                <BiSolidBrightnessHalf className="img-fluid hidden dark:block" style={{ fontSize: "24px" }} />
            </button>
            <button className="me-5">
              <BiSolidBellRing style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto bg-gray-100 dark:bg-dark-gray-color dark:text-white scroll w-[100%] h-[120%] sm:">
          <Outlet/>
        </div>
        <div className="flex flex-row justify-between px-3 border-t-2 py-2 bg-gray-color text-black shadow-black dark:bg-dark-color dark:text-white dark:shadow-white">
          <span>
            &copy; Copyright 2023{" "}
            <span
              className="text-secondary-color font-bold"
            >
              HanTask
            </span>
            . All Rights Reserved.
          </span>
          <span>Design : Muhammed Nasser Edden</span>
        </div>
      </div>
    </div>
  );
}
