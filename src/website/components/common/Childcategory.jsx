import { Link } from "react-router-dom";

const Childcategory = ({ image, title, servicesNumber, name, id }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="group w-[230px] bg-white h-[320px] component-shadow flex flex-col items-center justify-center gap-6 rounded-xl border hover:border-greenColor transition-all">
        <img src="/src/images/1.png" alt="" className="w-[120px] h-[120px] rounded-full object-cover" />
        <div className="flex justify-center items-center gap-2 flex-col">
          <h3 className="text-[2rem] font-semibold">{name}</h3>
          <span className="text-sm text-gray-500">test</span>
        </div>
        <Link to="/child-category-jobs" state={{ currentChildcategory: { name: name, id: id } }} className="group-hover:bg-greenColor group-hover:text-white  border group-hover:border-transparent text-gray-400 px-8 py-2 rounded-md transition-all">
          show
        </Link>
      </div>
    </div>
  );
};

export default Childcategory;
