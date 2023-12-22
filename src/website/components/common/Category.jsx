const Category = ({ image, title, servicesNumber }) => {
  return (
    <div className="group w-[300px] bg-white h-[350px] component-shadow flex flex-col items-center justify-center gap-6 rounded-xl border hover:border-greenColor transition-all">
      <img
        src="/src/images/1.png"
        alt=""
        className="w-[120px] h-[120px] rounded-full object-cover"
      />
      <div className="flex justify-center items-center gap-2 flex-col">
        <h3 className="text-[2rem] font-semibold">category name</h3>
        <span className="text-sm text-gray-500">test</span>
      </div>
      <a
        href="#"
        className="group-hover:bg-greenColor group-hover:text-white  border group-hover:border-transparent text-gray-400 px-8 py-2 rounded-md transition-all"
      >
        show
      </a>
    </div>
  );
};

export default Category;
