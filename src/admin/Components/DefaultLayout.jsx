import { Link, Outlet, Navigate } from "react-router-dom";
import {
  BiMenuAltLeft,
  BiSolidBellRing,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
  BiSolidChevronDown,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { useStateContext } from "../../contexts/ContextsProvider";
import axiosClient from "../../axios-client";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const { token , setTranslation } = useStateContext({})
  const user = JSON.parse(localStorage.getItem('USER'))
  const [mode, setMode] = useState(sessionStorage.getItem('mode'));

  useEffect(() => {
    getTranslation()
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
      sessionStorage.setItem('mode', mode)
    }
  }, [mode]);

  const handleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
    sessionStorage.setItem('mode', mode)
  };
  const handleAdminMenu = () => {
    setAdminMenuOpen(!adminmenuOpen);
  };

  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }

  const getTranslation = () => {
    axiosClient.get('/admin/translation').then((response) => {
      setTranslation(response.data);
    })
  }

  return (
    <div className={`flex flex-row h-screen bg-background-color`}>
      <div
        className={`flex flex-col h-screen text-primary-text overflow-y-auto scroll bg-blocks-color rounded-tr-lg z-20 shadow-lg gap-4  ${sidebarOpen ? "w-[280px]" : "w-0"
          }`}
      >
        <SidebarAdmin />
      </div>
      <div className="flex flex-col grow">
        <div
          className={`flex flex-row items-center component-shadow ml-[-15px] w-lg-[100.75%] w-sm-[100%] px-[30px] z-10  bg-blocks-color `}
        >
          <button className="flex-none w-20" onClick={handleSideBar}>
            <BiMenuAltLeft
              style={{ fontSize: "24px" }}
              className="text-primary-text"
            />
          </button>
          <div className="flex flex-row-reverse items-center grow">
            {/* admin Image And Menu */}
            <button
              className="flex flex-row items-center px-[25px] py-[24px] w-[220px] justify-between border-l border-[gray]"
              onClick={handleAdminMenu}
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
              <div className="text-primary-text px-3">{user.username}</div>
              <BiSolidChevronDown
                style={{ fontSize: "18px" }}
                className="text-primary-text"
              />
            </button>
            <div
              className={`absolute flex flex-col mt-[210px] w-[240px] overflow-y-auto me-[-20px] bg-blocks-color rounded-md ${adminmenuOpen ? "h-[auto]" : "h-0"
                }`}
            >
              <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out">
                Edit Profile
              </Link>
              <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out">
                Password Change
              </Link>
              <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out"
                to={'/admin/logout'}
              >
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
        <div className="overflow-y-auto text-primary-text scroll w-[100%] h-[120%] sm:">
          <Outlet />
        </div>
        <div
          className={`flex flex-row justify-between px-3 bg-blocks-color text-primary-text`}
        >
          <span>
            &copy; Copyright 2023{" "}
            <span
              className={`font-bold ${mode === "light" ? "text-primary-color" : "text-secondary-color"
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
