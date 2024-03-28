import { IoCalendar } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="flex flex-col gap-4 group transition-all">
      <img
        className="w-full max-h-[350px] group-hover:scale-105 transition-all rounded-lg component-shadow object-cover"
        src="/src/assets/banner1.jpg"
      />

      <h3 className="text-xl font-bold">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit
      </h3>

      <p className="text-sm text-secondary-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos incidunt
        iste impedit tempora laborum fugit minus qui dicta, voluptatem quaerat
        expedita id enim velit rem nobis odit molestiae deleniti consequatur.
      </p>
      <hr className="text-secondary-text" />

      <div className="flex gap-2 items-center text-secondary-text">
        <div className="flex gap-2 items-center">
          <IoCalendar size={16} />
          <span>date here</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaEye size={17} />
          <span>viewers here</span>
        </div>
      </div>

      <div className="flex items-center justify-center text-secondary-text">
        <Link
          to={"1"}
          className="w-full block text-center border rounded-3xl py-2 hover:bg-greenColor  transition-all hover:border-greenColor hover:text-white "
        >
          read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
