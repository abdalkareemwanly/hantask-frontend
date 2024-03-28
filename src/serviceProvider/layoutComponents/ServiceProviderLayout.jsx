import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  BiMenuAltLeft,
  BiSolidBellRing,
  BiSolidBrightnessHalf,
  BiSolidBrightness,
  BiSolidChevronDown,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import ServiceProviderSidebar from "./ServiceProviderSidebar";
import "react-toastify/dist/ReactToastify.css";
import { useTWThemeContext } from "../../admin/Components/ThemeProvider";
import { useStateContext } from "../../contexts/ContextsProvider";
import ModalContainer from "../../Components/ModalContainer";
import PasswordChange from "./PasswordChange";
import Button from "../../Components/Button";
import { userDark, userLight } from "../../images";

export default function ServiceProviderLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminmenuOpen, setAdminMenuOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const { setTheme } = useTWThemeContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { token, notifications } = useStateContext({});
  const user = JSON.parse(localStorage.getItem("USER"));
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
    return <Navigate to={"/"} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    navigate("/ ");
  };
  const handleChangePass = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={`flex-row md:flex bg-background-color `}>
      {isModalOpen && (
        <ModalContainer
          setIsModalOpen={setIsModalOpen}
          component={<PasswordChange setIsModalOpen={setIsModalOpen} />}
        />
      )}
      <div
        className={`flex flex-col flex-shrink-0 flex-grow-0 h-screen transition-all ease-in text-primary-text overflow-y-auto scroll bg-blocks-color  z-10 shadow-lg gap-4 fixed md:sticky top-0  ${
          sidebarOpen ? "md:w-[280px] w-[230px]" : "w-0"
        }`}
      >
        <ServiceProviderSidebar setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex flex-col flex-1">
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
                <img className="w-[30px]" src={userLight} />
              ) : (
                <img className="w-[30px]" src={userDark} />
              )}
              <div className="text-primary-text px-3">{user.username}</div>
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
              <Button title={"profile"} isLink={true} goto={"profile"} />
              <Button
                title={"change password"}
                isLink={false}
                onClickFun={handleChangePass}
              />
              <Button
                isLink={false}
                title={"logout"}
                onClickFun={handleLogout}
              />
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
              <div className="relative">
                <BiSolidBellRing
                  style={{ fontSize: "24px" }}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="text-primary-text"
                />
                {notifications?.data?.data?.filter((ele) => ele.status === 0)
                  .length > 0 && (
                  <span className="absolute top-[-20px]  right-[-20px] bg-greenColor rounded-full w-[25px] h-[25px] text-sm flex items-center justify-center ">
                    {
                      notifications.data.data.filter((ele) => ele.status === 0)
                        .length
                    }
                  </span>
                )}
              </div>
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
                    to={"/serviceProvider/notifications"}
                  >
                    show all
                  </Link>
                </div>
                <div className="my-4 flex flex-col items-start  gap-2">
                  {notifications?.data?.data?.map((ele, i) => (
                    <span key={i} className="">
                      {ele?.title}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="text-primary-text min-h-[91.7vh] px-2 md:px-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
