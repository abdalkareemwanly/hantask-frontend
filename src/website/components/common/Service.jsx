import { IoLocationSharp } from "react-icons/io5";

const Service = ({ item }) => {
  return (
    <div className="group w-[350px] border  rounded-xl hover:border-transparent hover:component-shadow transition-all">
      <div className="overflow-hidden rounded-tr-xl rounded-tl-xl">
        <img
          src={import.meta.env.VITE_WEBSITE_URL + item.image}
          className="group-hover:scale-110 w-full rounded-tr-xl rounded-tl-xl transition-all h-[200px] overflow-hidden object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="text-[#ff6b2c]">
          <IoLocationSharp />
        </div>
        <div className="text-2xl font-medium hover:text-[#ff6b2c] transition-all">
          {item?.title}
        </div>
      </div>
    </div>
  );
};

export default Service;
