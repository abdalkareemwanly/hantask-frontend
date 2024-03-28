import { BiUserCircle } from "react-icons/bi";
import { useTWThemeContext } from "../../../Components/ThemeProvider";

export default function Statistics({ alldata }) {
  const { theme } = useTWThemeContext();

  return (
    <div className="flex flex-wrap w-full justify-between gap-8">
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-greenColor text-white" : "bg-blocks-color"
        }   flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">{alldata?.totalAdmin}</span>
          <span className="text-[16px] font-semibold">Total Admin</span>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-redColor text-white" : "bg-blocks-color"
        }  flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-secondary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">{alldata?.totalSeller}</span>
          <span className="text-[16px] font-semibold">Total handymans</span>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-blueColor text-white" : "bg-blocks-color"
        }  flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">{alldata?.totalBuyer}</span>
          <span className="text-[16px] font-semibold">Total homeowners</span>
        </div>
      </div>
      <div
        className={`flex flex-row bg-blocks-color flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2 linear">
          <span className="text-[28px] font-bold">
            {alldata?.totalSubscription}
          </span>
          <span className="text-[16px] font-semibold">Total subscriptions</span>
        </div>
      </div>
    </div>
  );
}
