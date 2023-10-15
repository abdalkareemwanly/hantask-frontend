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
import classnames from "classnames/bind";
import SidebarAdmin1 from "./SidebarAdmin1";

 // Define class names for light and dark mode
 const lightsidebarClasses = "bg-gray-color text-black shadow-black";
 const darksidebarClasses = "bg-dark-color text-white shadow-white";
 const lightheaderClasses = "bg-md-gray-color text-black shadow-[gray]";
 const darkheaderClasses = "bg-hard-gray-color text-white shadow-[gray]";
 const lightbodyClasses = "bg-light text-black";
 const darkbodyClasses = "bg-dark-gray-color text-white";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const [mode, setMode] = useState("light");

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleMode = () => {
    // Toggle between light and dark mode
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const handleAdminMenu = () => {
    setAdminMenuOpen(!adminmenuOpen);
  };

  // Create a classnames function for conditional class application
  const side = classnames("transition-all duration-500 ease-in-out", {
    [lightsidebarClasses]: mode === "light",
    [darksidebarClasses]: mode === "dark",
  });

  const header = classnames("transition-all duration-500 ease-in-out", {
    [lightheaderClasses]: mode === "light",
    [darkheaderClasses]: mode === "dark",
  });

  const boody = classnames("transition-all duration-500 ease-in-out", {
    [lightbodyClasses]: mode === "light",
    [darkbodyClasses]: mode === "dark",
  });

  return (
    <div className={`flex flex-row h-screen ${boody}`}>
      <div
        className={`flex flex-col h-screen overflow-y-auto scroll rounded-tr-lg z-20 shadow-lg ${side} ${
          sidebarOpen ? "w-[280px]" : "w-0"
        }`}
      >
        <SidebarAdmin1 />
      </div>
      <div className='flex flex-col grow'>
        <div
          className={`flex flex-row items-center ml-[-15px] w-lg-[100.75%] w-sm-[100%] px-[30px] z-10 shadow-md ${header}`}
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
              {mode === "light" ? (
                <img
                  className="w-[30px]"
                  src="/public/images/user-light.png"
                  alt=""
                />
              ) : (
                <img
                  className="w-[30px]"
                  src="/public/images/user-dark.png"
                  alt=""
                />
              )}
              <div>Admin</div>
              <BiSolidChevronDown style={{ fontSize: "18px" }} />
            </button>
            <div
              className={`absolute flex flex-col mt-[210px] w-[180px] overflow-y-auto me-[-20px] shadow-md${header} ${
                adminmenuOpen ? "h-[auto]" : "h-0"
              }`}
            >
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color ">Edit Profile</Link>
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color">Password Change</Link>
              <Link className="font-bold ps-6 py-2 hover:bg-gray-color">Logout</Link>
            </div>
            <button onClick={handleMode} className="me-5">
              {mode === "light" ? (
                <BiSolidBrightness style={{ fontSize: "24px" }} />
              ) : (
                <BiSolidBrightnessHalf style={{ fontSize: "24px" }} />
              )}
            </button>
            <button className="me-5">
              <BiSolidBellRing style={{ fontSize: "24px" }} />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto scroll w-[100%] h-[120%] sm:">
          <Outlet/>
        </div>
        <div className={`flex flex-row justify-between px-3 ${header}`}>
          <span>
            &copy; Copyright 2023{" "}
            <span
              className={`font-bold ${
                mode === "light" ? "text-primary-color" : "text-secondary-color"
              }`}
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
