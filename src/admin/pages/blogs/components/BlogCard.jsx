import { IoCalendar } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ data, setEditModalOpen }) => {
  return (
    <div className="flex flex-col gap-4 group transition-all bg-blocks-color rounded-3xl  overflow-hidden">
      <img
        className="w-full max-h-[350px] group-hover:scale-105 transition-all  component-shadow object-cover"
        src={import.meta.env.VITE_WEBSITE_URL + "/" + data?.image}
      />

      <div className="p-2 flex flex-col gap-4">
        <h3 className="text-xl font-bold">{data?.title}</h3>
        <hr className="text-secondary-text" />
        <div className="flex gap-2 items-center text-secondary-text">
          <div className="flex gap-2 items-center">
            <IoCalendar size={16} />
            <span>{data?.created_at.slice(0, 10)}</span>
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center text-secondary-text">
          <Link
            to={"1"}
            className="w-full block text-center text-primary-text rounded-2xl py-2 bg-greenColor  transition-all text-white "
          >
            show
          </Link>
          <button
            to={"1"}
            onClick={() => setEditModalOpen(data)}
            className="w-full block text-center text-primary-text rounded-2xl py-2 bg-orangeColor  transition-all text-white "
          >
            edit
          </button>
          <button
            to={"1"}
            className="w-full block text-center text-primary-text rounded-2xl py-2 bg-redColor  transition-all text-white "
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
