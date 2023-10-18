// import React from 'react'
import { useState } from "react";
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
  BiSolidSpa,
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

export default function SidebarAdmin() {
  const mode = sessionStorage.getItem("mode");
  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [listName, setListName] = useState(null);

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

  return (
    <>
      <h2 className="w-full sticky top-0 bg-inherit px-5 py-[20px] bg-blocks-color ">
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
      <Link
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        to="/index"
      >
        <strong className="m-3">
          <BiSolidHome />
        </strong>
        <strong className="m-1">Dashboard</strong>
      </Link>
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("chat");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidMessageRoundedDetail />
          </strong>
          <strong className={listName === "chat" ? "ms-1 text-danger" : "ms-1"}>
            Live Chat
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
      {listName === "chat" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Chat Users
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Chat Login Text
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Blogs");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidMessageDetail />
          </strong>
          <strong
            className={listName === "Blogs" ? "ms-1 text-danger" : "ms-1"}
          >
            Blogs
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Blogs" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Blogs" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Blogs
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Tags
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Post
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Trashed Items
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Blog Details Settings
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Subscription");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidDirections />
          </strong>
          <strong
            className={
              listName === "Subscription" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Subscription
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Subscription" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Subscription" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Subscription Users
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Subscription Login Text
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Jobs");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidBriefcaseAlt2 />
          </strong>
          <strong className={listName === "Jobs" ? "ms-1 text-danger" : "ms-1"}>
            Jobs
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Jobs" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Jobs" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Jobs
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Jobs Sitting
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Wallet");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidDollarCircle />
          </strong>
          <strong
            className={listName === "Wallet" ? "ms-1 text-danger" : "ms-1"}
          >
            Wallet
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Wallet" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Wallet" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Wallet Lists
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Wallet History
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Admin Role Manage");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidUser />
          </strong>
          <strong
            className={
              listName === "Admin Role Manage" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Admin Role Manage
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Admin Role Manage" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Admin Role Manage" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Admin
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Admin
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Admin Role
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Admin Services");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidUser />
          </strong>
          <strong
            className={
              listName === "Admin Services" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Admin Services
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Admin Services" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Admin Services" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Admin Services
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add Services
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Users Manage");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidUser />
          </strong>
          <strong
            className={listName === "Users Manag" ? "ms-1 text-danger" : "ms-1"}
          >
            Users Manage
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Users Manag" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Users Manage" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Users
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Deactive Users
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Seller Settings");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidUser />
          </strong>
          <strong
            className={
              listName === "Seller Settings" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Seller Settings
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Seller Settings" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Seller Settings" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Payout Request
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Admin Commission
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Amount Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            User Register Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Seller
          </Link>
        </div>
      ) : null}
      <Link
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        to="/"
      >
        <strong className="m-3">
          <BiSolidUser />
        </strong>
        <strong className="ms-1">Seller Buyer Report</strong>
      </Link>
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Pages");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidFile />
          </strong>
          <strong
            className={listName === "Pages" ? "ms-1 text-danger" : "ms-1"}
          >
            Pages
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Pages" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Pages" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Pages
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Page
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Categories");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidCategory />
          </strong>
          <strong
            className={listName === "Categories" ? "ms-1 text-danger" : "ms-1"}
          >
            Categories
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Categories" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Categories" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All test
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New test
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Sub Category");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidCreditCard />
          </strong>
          <strong
            className={
              listName === "Sub Category" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Sub Category
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Sub Category" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Sub Category" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Sub Category
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Sub Category
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Child Categories");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidCreditCard />
          </strong>
          <strong
            className={
              listName === "Child Categories" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Child Categories
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Child Categories" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Child Categories" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Child Categories
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Child Categories
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Brands");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidSpa />
          </strong>
          <strong
            className={listName === "Brands" ? "ms-1 text-danger" : "ms-1"}
          >
            Brands
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Brands" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Brands" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Brands
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Brands
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Service Country");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidMap />
          </strong>
          <strong
            className={
              listName === "Service Country" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Service Country
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Service Country" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Service Country" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Country
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Country
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Import Country
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Service City");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidMap />
          </strong>
          <strong
            className={
              listName === "Service City" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Service City
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Service City" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Service City" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All City
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New City
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Import City
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Service Area");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidMap />
          </strong>
          <strong
            className={
              listName === "Service Area" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Service Area
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Service Area" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Service Area" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Area
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Add New Area
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Import Area
          </Link>
        </div>
      ) : null}
      <Link
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        to="/"
      >
        <strong className="m-3">
          <BiSolidTachometer />
        </strong>
        <strong className="ms-2">Tax</strong>
      </Link>
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Services");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidServer />
          </strong>
          <strong
            className={listName === "Services" ? "ms-1 text-danger" : "ms-1"}
          >
            Services
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Services" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Services" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Services
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Login Register Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Service Details Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Service Create Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Service Book Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Order Create Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Load More Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Google Map Settings
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Orders");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidTruck />
          </strong>
          <strong
            className={listName === "Orders" ? "ms-1 text-danger" : "ms-1"}
          >
            Orders
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Orders" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Orders" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Orders
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Cancelled Orders
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Order Success Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Order Request Complete
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Decline Complete Request
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Extra Orders
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Tickets");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidGift />
          </strong>
          <strong
            className={listName === "Tickets" ? "ms-1 text-danger" : "ms-1"}
          >
            Tickets
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Tickets" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Tickets" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Tickets
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Notifications");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidBellRing />
          </strong>
          <strong
            className={
              listName === "Notifications" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Notifications
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Notifications" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Notifications" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Notifications
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Email Template Settings");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidEnvelope />
          </strong>
          <strong
            className={
              listName === "Email Template Settings"
                ? "ms-2 text-danger"
                : "ms-2"
            }
          >
            Email Template Settings
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Email Template Settings" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Email Template Settings" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Email Templates
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Form Builder");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidFile />
          </strong>
          <strong
            className={
              listName === "Form Builder" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Form Builder
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Form Builder" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Form Builder" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            All Custom Form
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Appearance Settings");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidLayout />
          </strong>
          <strong
            className={
              listName === "Appearance Settings" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Appearance Settings
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Appearance Settings" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Appearance Settings" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Seller/Buyer Panel Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Media Images Manage
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Widget Builder
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Menu Manage
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("Other Page Settings");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidLayout />
          </strong>
          <strong
            className={
              listName === "Other Page Settings" ? "ms-1 text-danger" : "ms-1"
            }
          >
            Other Page Settings
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "Other Page Settings" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "Other Page Settings" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            404 Page Manage
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Maintain Page Manage
          </Link>
        </div>
      ) : null}
      <button
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        title="User Tools"
        onClick={() => {
          getdropdownopen("General Settings");
        }}
      >
        <div className="flex grow items-center">
          <strong className="m-3">
            <BiSolidCog />
          </strong>
          <strong
            className={
              listName === "General Settings" ? "ms-1 text-danger" : "ms-1"
            }
          >
            General Settings
          </strong>
        </div>
        <div className="me-3">
          {DropdownOpen === true && listName === "General Settings" ? (
            <BiSolidChevronUp />
          ) : (
            <BiSolidChevronDown />
          )}
        </div>
      </button>
      {listName === "General Settings" ? (
        <div className="flex flex-col">
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Mobile Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Reading
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Navbar Global Variant
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Footer Global Variant
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Payment Gateway Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Live Chat Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Site Identity
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Basic Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            OTP Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Color Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Typography Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            SEO Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Third Party Scripts
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Email Template
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Email Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            SMTP Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Custom CSS
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Custom JS
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Gdpr Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Licence Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            SCheck Update
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Cache Settings
          </Link>
          <Link
            className="py-[10px] px-[43px] hover:bg-dark-gray-color hover:text-[white] focus:font-extrabold focus:bg-hard-gray-color"
            to="/"
          >
            Database Upgrade
          </Link>
        </div>
      ) : null}

      <Link
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        to="/"
      >
        <strong className="m-3">
          <BiSolidObjectsHorizontalCenter />
        </strong>
        <strong className="ms-1">Languages</strong>
      </Link>

      <Link
        className="flex flex-row w-full items-center hover:bg-hard-gray-color"
        to="/"
      >
        <strong className="m-3">
          <BiSolidArrowFromRight />
        </strong>
        <strong className="ms-1">Back To Site</strong>
      </Link>
    </>
  );
}
