import { Link } from "react-router-dom";
import LazyMedia from "../../../Components/LazyMedia";

const Category = ({ image, title, servicesNumber, name, id }) => {
  return (
    <Link
      to="/subcategories"
      state={{ currentCategory: { name: name, id: id } }}
      className="group  items-center  h-[120px] p-6 bg-white  component-shadow flex  gap-6 rounded-xl border hover:border-greenColor transition-all"
    >
      <LazyMedia
        classes={"w-[60px] h-[60px] rounded-full object-cover"}
        src={import.meta.env.VITE_WEBSITE_URL + image}
      />

      <div className="flex justify-center items-center gap-2 flex-col">
        <h3 className="text-xl font-semibold  ml-auto">{name}</h3>
      </div>
    </Link>
  );
};

export default Category;
