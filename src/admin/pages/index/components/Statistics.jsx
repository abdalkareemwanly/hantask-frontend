import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import axiosClient from "../../../../axios-client";

export default function Statistics() {
  const [ alldata , setData ] = useState({
    admin: 0
  })

  useEffect(()=>{
    getAdminNumber()
  },[])

  const getAdminNumber = () => {
    axiosClient.get("/admin/AdminNumber").then((response)=>{
      setData({ ...alldata, admin: response.data})
    })
  }
  return (
    <div className="flex flex-col lg:flex-row md:flex-none justify-around lg:w-[95%] sm:w-full">
      <div className="flex flex-row flex-none bg-blocks-color lg:w-[20%] sm:w-[90%] items-center lg:px-5 sm:px-1 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
        <div className="rounded-full p-2 ">
          <BiUserCircle className="text-primary-color text-[42px]" />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">{alldata.admin}</span>
          <span className="text-[16px] font-semibold">Total Admin</span>
        </div>
      </div>
      <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
        <div className="rounded-full p-2 ">
          <BiUserCircle className="text-secondary-color text-[42px]" />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">67</span>
          <span className="text-[16px] font-semibold">Total Seller</span>
        </div>
      </div>
      <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-primary-color py-[10px] text-white">
        <div className="rounded-full p-2 ">
          <BiUserCircle className="text-primary-color text-[42px]" />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">213</span>
          <span className="text-[16px] font-semibold">Total Buyer</span>
        </div>
      </div>
      <div className="flex flex-row flex-none bg-blocks-color w-[20%] items-center px-5 rounded-md  component-shadow bg-secondary-color py-[10px] text-white">
        <div className="rounded-full p-2 ">
          <BiUserCircle className="text-secondary-color text-[42px]" />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">$417.44</span>
          <span className="text-[16px] font-semibold">Total Earning</span>
        </div>
      </div>
    </div>
  );
}
