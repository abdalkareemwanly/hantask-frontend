import { Link } from "react-router-dom";

const Category = ({ image, title, servicesNumber, name, id }) => {
  return (
    <Link
      to="/subcategories"
      state={{ currentCategory: { name: name, id: id } }}
      className="group min-w-[250px] min-h-[100px] p-6 bg-white items-center component-shadow flex  gap-6 rounded-xl border hover:border-greenColor transition-all"
    >
      <img
        src={import.meta.env.VITE_WEBSITE_URL + image}
        className="w-[50px] h-[50px] rounded-full object-cover"
      />
      <div className="flex justify-center items-center gap-2 flex-col">
        <h3 className="text-xl font-semibold max-w-[150px]">{name}</h3>
      </div>
    </Link>
  );
};

export default Category;
