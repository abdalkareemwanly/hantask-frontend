import { BiUserCircle } from "react-icons/bi";
import { useTWThemeContext } from "../../../Components/ThemeProvider";

export default function Statistics() {
  const { theme } = useTWThemeContext();
  return (
    <div className="flex flex-wrap w-full justify-between gap-8">
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-greenBtn text-white" : "bg-blocks-color"
        }   flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">3</span>
          <span className="text-[16px] font-semibold">Total Admin</span>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-redBtn text-white" : "bg-blocks-color"
        }  flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-secondary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">67</span>
          <span className="text-[16px] font-semibold">Total Seller</span>
        </div>
      </div>
      <div
        className={`flex flex-row ${
          theme === "light" ? "bg-blueBtn text-white" : "bg-blocks-color"
        }  flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">213</span>
          <span className="text-[16px] font-semibold">Total Buyer</span>
        </div>
      </div>
      <div
        className={`flex flex-row bg-blocks-color flex-1 h-[120px] basis-[300px]  items-center px-5 rounded-md  component-shadow bg-primary-color  text-primary-text`}
      >
        <div className="rounded-full p-2 ">
          <BiUserCircle fontSize={60} />
        </div>
        <div className="flex flex-col justify-center ms-5 mt-2">
          <span className="text-[28px] font-bold">$417.44</span>
          <span className="text-[16px] font-semibold">Total Earning</span>
        </div>
      </div>
    </div>
  );
}
