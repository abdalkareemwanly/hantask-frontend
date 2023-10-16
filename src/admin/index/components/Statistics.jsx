import { BiUserCircle } from "react-icons/bi";

export default function Statistics() {
  return (
    <>
      <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%]">
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-primary-color bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">3</span>
            <span className="text-[16px] font-semibold">Total Admin</span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-secondary-color bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">67</span>
            <span className="text-[16px] font-semibold">Total Seller</span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-primary-color bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">213</span>
            <span className="text-[16px] font-semibold">Total Buyer</span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-secondary-color bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">$417.44</span>
            <span className="text-[16px] font-semibold">Total Earning</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-none justify-around w-[95%] mt-7">
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-primary-color bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">450</span>
            <span className="text-[16px] font-semibold">Order Pending</span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-secondary-color bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">46</span>
            <span className="text-[16px] font-semibold">Pending Service</span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-primary-color bg-primary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-primary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">6</span>
            <span className="text-[16px] font-semibold">
              New Payout Request
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-none w-[100%] xl:w-[20%] sm:w-[auto] items-center px-3 lg:px-5 my-2 lg:my-0 rounded-md  shadow-md shadow-secondary-color bg-secondary-color py-[10px] text-white">
          <div className="rounded-full p-2 bg-[white]">
            <BiUserCircle className="text-secondary-color text-[42px]" />
          </div>
          <div className="flex flex-col justify-center ms-5 mt-2">
            <span className="text-[28px] font-bold">0</span>
            <span className="text-[16px] font-semibold">New User Today</span>
          </div>
        </div>
      </div>
    </>
  );
}
