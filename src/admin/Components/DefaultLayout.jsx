// import React from 'react'
import { Link, Outlet } from "react-router-dom";
import {
  BiMenuAltLeft,
  BiSolidBellRing,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
  BiSolidChevronDown,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { TWThemeProvider, useTWThemeContext } from "./ThemeProvider";
import { ToastContainer } from "react-toastify";
// import { document } from "postcss";
import "react-toastify/dist/ReactToastify.css";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const { setTheme } = useTWThemeContext();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    localStorage.setItem("theme", mode);
    setTheme(mode);
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
    }
  }, [mode]);

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const handleAdminMenu = () => {
    setAdminMenuOpen(!adminmenuOpen);
  };

  return (
    <div className={`flex flex-row h-screen bg-background-color`}>
      <ToastContainer />
      <div
        className={`flex flex-col h-screen transition-all ease-in text-primary-text overflow-y-auto scroll bg-blocks-color  z-10 shadow-lg gap-4 fixed md:static  ${
          sidebarOpen ? "md:w-[280px] w-[230px]" : "w-0"
        }`}
      >
        <SidebarAdmin setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex flex-col grow">
        <div
          className={`flex flex-row items-center component-shadow w-sm-[100%] px-2 md:px-14 z-10  bg-blocks-color `}
        >
          <button className="" onClick={handleSideBar}>
            <BiMenuAltLeft
              style={{ fontSize: "30px" }}
              className="text-primary-text"
            />
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
              <div className="text-primary-text">Admin</div>
              <BiSolidChevronDown
                style={{ fontSize: "18px" }}
                className="text-primary-text"
              />
            </button>
            <div
              className={`absolute flex flex-col mt-[210px] w-[180px] overflow-y-auto me-[-20px] bg-blocks-color rounded-md ${
                adminmenuOpen ? "h-[auto]" : "h-0"
              }`}
            >
              <Link className="font-bold ps-6 py-2 text-primary-text ">
                Edit Profile
              </Link>
              <Link className="font-bold ps-6 py-2 text-primary-text">
                Password Change
              </Link>
              <Link className="font-bold ps-6 py-2 text-primary-text">
                Logout
              </Link>
            </div>
            <button onClick={handleMode} className="me-5">
              {mode === "light" ? (
                <BiSolidBrightness
                  style={{ fontSize: "24px" }}
                  className="text-primary-text"
                />
              ) : (
                <BiSolidBrightnessHalf
                  style={{ fontSize: "24px" }}
                  className="text-primary-text"
                />
              )}
            </button>
            <button className="me-5">
              <BiSolidBellRing
                style={{ fontSize: "24px" }}
                className="text-primary-text"
              />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto text-primary-text scroll w-[100%] h-[120%] px-2 md:px-14">
          <Outlet />
        </div>
        <div
          className={`flex flex-row justify-between px-3 bg-blocks-color text-primary-text`}
        >
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
