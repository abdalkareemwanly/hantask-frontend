import { Link, Navigate, Outlet } from "react-router-dom";
import {
  BiMenuAltLeft,
  BiSolidBellRing,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
  BiSolidChevronDown,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { useTWThemeContext } from "./ThemeProvider";
import { useStateContext } from "../../contexts/ContextsProvider";
import axiosClient from "../../axios-client";
import "react-toastify/dist/ReactToastify.css";

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const { setTheme } = useTWThemeContext();
  const { token, setTranslation } = useStateContext({});
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("USER"));
  const getTranslation = () => {
    axiosClient.get("/admin/translation").then((response) => {
      setTranslation(response.data);
    });
  };

  useEffect(() => {
    getTranslation();
    const htmlElement = document.querySelector("html");
    localStorage.setItem("theme", mode);
    setTheme(mode);
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
      sessionStorage.setItem("mode", mode);
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

  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <div className={`flex-row md:flex bg-background-color `}>
      <div
        className={`flex flex-col flex-shrink-0 flex-grow-0 h-screen transition-all ease-in text-primary-text overflow-y-auto scroll bg-blocks-color  z-10 shadow-lg gap-4 fixed md:sticky top-0 ${
          sidebarOpen ? "w-1/5" : "w-0"
        }`}
      >
        <SidebarAdmin setSidebarOpen={setSidebarOpen} />
      </div>
      <div
        className={`flex flex-col w-full  ${
          sidebarOpen ? "sm:w-[80%]" : "w-full"
        }`}
      >
        <div
          className={`flex flex-row items-center component-shadow w-sm-[100%] px-2 md:px-14 z-8 bg-blocks-color `}
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
              <div className="text-primary-text px-3">{user?.username}</div>
              <BiSolidChevronDown
                style={{ fontSize: "18px" }}
                className="text-primary-text"
              />
            </button>
            <div
              className={`absolute flex flex-col mt-[210px] w-[240px] overflow-y-auto me-[-20px] component-shadow bg-blocks-color z-10 rounded-md ${
                adminmenuOpen ? "h-[auto]" : "h-0"
              }`}
            >
              <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out">
                Edit Profile
              </Link>
              <Link className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out">
                Password Change
              </Link>
              <Link
                className="font-bold ps-6 py-2 text-primary-text hover:bg-background-color transition-all duration-400 ease-in-out"
                to={"/admin/dashboard/logout"}
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
            <button className="me-5 relative block">
              <BiSolidBellRing
                style={{ fontSize: "24px" }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="text-primary-text"
              />
              <div
                className={`absolute flex flex-col top-14 right-0 w-[380px]  text-primary-text overflow-y-auto me-[-20px] component-shadow bg-blocks-color z-10 rounded-md ${
                  isNotificationOpen ? "h-[auto] p-4" : "h-0 p-0"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    recent notifications
                  </h3>
                  <Link
                    className="text-blueColor"
                    to={"/admin/dashboard/notification"}
                  >
                    show all
                  </Link>
                </div>
                <div className="my-4 flex flex-col gap-2">
                  <div>first notification</div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="text-primary-text w-full min-h-[91.7vh] px-2 md:px-14">
          <Outlet />
        </div>
        {/* <div
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
        </div> */}
      </div>
    </div>
  );
}
