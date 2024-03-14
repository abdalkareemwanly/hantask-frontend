import { useState } from "react";
import { GoSearch } from "react-icons/go";

const PersonalBox = ({ user }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <div className="flex gap-4 items-center h-[60px]  rounded-md relative">
      <img
        className="w-[50px] h-[50px] rounded-[50%] block object-cover object-center"
        src={import.meta.env.VITE_WEBSITE_URL + user.image}
      />
      <div className=" flex-1 h-full rounded-md flex gap-3 items-center justify-between">
        <div>
          <h3 className="font-medium text-lg"> {user.name}</h3>
          <span className="text-secondary-text text-sm">info account</span>
        </div>
        <span className="text-sm cursor-pointer">
          <GoSearch
            onClick={() => setToggleSearch((prev) => !prev)}
            size={"25"}
          />
          {toggleSearch && (
            <input
              type="text"
              className="absolute right-0 bottom-[-25px] w-[60%] border border-mainBorder py-1 px-3 rounded-lg  bg-background-color outline-none "
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default PersonalBox;
