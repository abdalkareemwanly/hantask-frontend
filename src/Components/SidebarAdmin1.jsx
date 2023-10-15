// import React from 'react'
import { useEffect, useState } from "react";
import {
  BiSolidMessageRoundedDetail,
  BiSolidHome,
  BiSolidChevronDown,
  BiSolidChevronUp,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export default function SidebarAdmin() {
  const mode = sessionStorage.getItem("mode");
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [listName, setListName] = useState(null);
  const [sideList, setSideList] = useState({});

  const getdropdownopen = (name) => {
    if (DropdownOpen === false) {
      setDropdownOpen(true);
      setListName(name);
    } else if (name === listName) {
      setDropdownOpen(true);
    } else {
      setListName(name);
    }
  };

  useEffect(() => {
    getSideBar();
  }, []);

  const getSideBar = () => {
    fetch("/src/adminList.json")
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
      <h2 className="w-full sticky top-0 bg-inherit px-5 py-[17px] shadow-sm shadow-[gray]">
        {mode === "light" ? (
          <img
            src="/public/images/logo-light.png"
            className="img-fluid"
            alt="Logo"
          />
        ) : (
          <img
            src="/public/images/logo-dark.png"
            className="img-fluid"
            alt="Logo"
          />
        )}
      </h2>

      {Object.entries(sideList).map(([key, value]) =>
        value == null ? (
          <Link
            key={key}
            className="flex flex-row w-full items-center hover:bg-hard-gray-color"
            to={`/${key}`}
          >
            <strong className="m-3">
              <BiSolidHome />
            </strong>
            <strong className="m-1">{key}</strong>
          </Link>
        ) : (
          <div key={key}>
            <button
              className="flex flex-row w-full items-center hover:bg-hard-gray-color"
              title="User Tools"
              onClick={() => {
                getdropdownopen(key);
              }}
            >
              <div className="flex grow items-center">
                <strong className="m-3">
                  <BiSolidMessageRoundedDetail />
                </strong>
                <strong
                  className={listName === "chat" ? "ms-1 text-danger" : "ms-1"}
                >
                  {key}
                </strong>
              </div>
              <div className="me-3">
                {DropdownOpen === true && listName === "chat" ? (
                  <BiSolidChevronUp />
                ) : (
                  <BiSolidChevronDown />
                )}
              </div>
            </button>
            {listName === key ? (
              <div className="flex flex-col">
                {Object.entries(value).map(([k, val]) => (
                  <Link
                    key={k}
                    className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
                    to={`/${val}`}
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
