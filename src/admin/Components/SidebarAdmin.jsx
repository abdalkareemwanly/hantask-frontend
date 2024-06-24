import { useEffect, useState } from "react";
import {
  BiSolidMessageDetail,
  BiSolidMessageRoundedDetail,
  BiSolidArrowFromRight,
  BiSolidCategory,
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
  BiSolidCreditCardFront,
  BiSolidObjectsHorizontalCenter,
} from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useTWThemeContext } from "./ThemeProvider";
import { AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../../contexts/ContextsProvider";
import useCheckPermission from "../../hooks/checkPermissions";
import { RiCoupon3Fill, RiPagesFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaPager } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const iconMap = {
  Dashboard: <BiSolidHome />,
  "reports chats": <BiSolidMessageRoundedDetail size={20} />,
  posts: <BiSolidMessageDetail />,
  "Admin Role Manage": <BiSolidUser />,
  "accounts Manage": <MdManageAccounts size={20} />,
  Categories: <BiSolidCategory />,
  "Sub Category": <BiSolidCategory />,
  "Child Categories": <BiSolidCategory />,
  locations: <BiSolidMap />,
  Services: <BiSolidServer />,
  notifications: <BiSolidBellRing />,
  "Form Builder": <BiSolidLayout />,
  "Other Page Settings": <BiSolidLayout />,
  "General Settings": <BiSolidCog />,
  Languages: <BiSolidDirections />,
  "Back To Site": <BiSolidArrowFromRight />,
  "Payment Settings": <BiSolidCreditCardFront />,
  "handymans verify": <MdVerifiedUser />,
  blogs: <FaPager />,
  "pages settings": <RiPagesFill />,
  "general settings": <IoSettings />,
};

export default function SidebarAdmin({ setSidebarOpen }) {
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const { translation } = useStateContext();
  const [listName, setListName] = useState(null);
  const [sideList, setSideList] = useState({});
  const nav = useNavigate();

  const { hasPermissionFun } = useCheckPermission();

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
  const { theme } = useTWThemeContext();
  const handleCloseSideBar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className="bg-inherit  px-3 py-[20px] bg-blocks-color flex items-center justify-between">
        {theme === "light" ? (
          <img
            onClick={() => nav("/")}
            src="/src/images/logo-light.png"
            className="w-[80%] cursor-pointer md:w-full"
            alt="Logo"
          />
        ) : (
          <img
            onClick={() => nav("/")}
            src="/src/images/logo-dark.png"
            className="w-[80%] cursor-pointer md:w-full"
            alt="Logo"
          />
        )}
        <span className="md:hidden cursor-pointer" onClick={handleCloseSideBar}>
          <AiOutlineClose size={27} />
        </span>
      </div>

      {Object.entries(sideList).map(([title, sublist]) => {
        const isShowen =
          sublist?.perId === undefined
            ? Object.entries(sublist).some(([k, val]) => {
                return hasPermissionFun(val?.perId) ? true : false;
              })
            : hasPermissionFun(sublist?.perId);
        return isShowen ? (
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
                <strong className="m-1 text-primary-text">
                  {title in translation ? translation[title] : title}
                </strong>
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
                      className={
                        listName === title ? "ms-1 text-danger" : "ms-1"
                      }
                    >
                      {title in translation ? translation[title] : title}
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
                    Object.entries(sublist).map(([k, val]) => {
                      return (
                        <Link
                          key={k}
                          className="py-[10px] px-[43px] hover:bg-background-color active:bg-background-color focus:bg-background-color transition-all duration-400 ease-in-out"
                          to={`${val.path}`}
                        >
                          {k in translation ? translation[k] : k}
                        </Link>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        );
      })}
    </>
  );
}
