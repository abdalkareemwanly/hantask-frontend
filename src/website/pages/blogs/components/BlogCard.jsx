import { IoCalendar } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-4 group transition-all">
      <img
        className="w-full h-[250px] group-hover:scale-105 transition-all rounded-lg component-shadow object-cover"
        src={import.meta.env.VITE_WEBSITE_URL + "/" + data.image}
      />

      <h3 className="text-xl font-bold">{data.title}</h3>

      <p className="text-sm text-secondary-text">
        {data.meta_description?.length > 150
          ? data.meta_description?.slice(0, 150) + "..."
          : data.meta_description}
      </p>
      <hr className="text-secondary-text" />

      <div className="flex gap-2 items-center text-secondary-text">
        <div className="flex gap-2 items-center">
          <IoCalendar size={16} />
          <span>{data.created_at.slice(0, 10)}</span>
        </div>
        {/* <div className="flex gap-2 items-center">
          <FaEye size={17} />
          <span>viewers here</span>
        </div> */}
      </div>

      <div className="flex items-center justify-center text-secondary-text">
        <Link
          to={`/blogs/${data.id}`}
          className="w-full block text-center border rounded-3xl py-2 hover:bg-greenColor  transition-all hover:border-greenColor hover:text-white "
        >
          read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
