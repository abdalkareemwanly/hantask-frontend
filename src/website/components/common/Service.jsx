import { IoLocationSharp } from "react-icons/io5";

const Service = () => {
  return (
    <div className="group w-[350px] border  rounded-xl hover:border-transparent hover:component-shadow transition-all">
      <div className="overflow-hidden rounded-tr-xl rounded-tl-xl">
        <img
          src="/src/images/2.png"
          className="group-hover:scale-110 w-full rounded-tr-xl rounded-tl-xl transition-all h-[200px] overflow-hidden object-cover"
          alt=""
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="text-[#ff6b2c]">
          <IoLocationSharp />
        </div>
        <a
          href="#"
          className="text-2xl font-medium hover:text-[#ff6b2c] transition-all"
        >
          service title
        </a>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">starting at</span>{" "}
          <span className="text-2xl font-medium">$123</span>
        </div>
        <div className="flex flex-row items-center gap-4 border-t border-b py-4">
          <img
            src="/src/images/p1.jpg"
            className="w-[30px] h-[30px] object-cover rounded-full"
            alt=""
          />
          <span>seller name</span>
        </div>
        <a
          href="#"
          className="w-full py-2 border rounded-md text-center text-lg font-medium hover:bg-[#ff6b2c] hover:text-white transition-all"
        >
          book now
        </a>
      </div>
    </div>
  );
};

export default Service;
