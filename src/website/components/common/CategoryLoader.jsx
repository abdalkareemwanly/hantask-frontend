const CategoryLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="group w-[230px] bg-white h-[320px] component-shadow flex flex-col items-center justify-center gap-6 rounded-xl border  transition-all loader">
        <div className="w-[120px] h-[120px] rounded-full bg-[#9ca3af]"></div>
        <div className="flex justify-center items-center gap-2 flex-col w-[100%]">
          <h3 className="text-[1.5rem] font-semibold bg-[#9ca3af] w-[70%] h-[2rem]"></h3>
          <span className="text-sm text-gray-500"></span>
        </div>
        <span className="bg-[#9ca3af] text-transparent px-8 py-2 rounded-md w-[40%] h-[2rem]"></span>
      </div>
    </div>
  );
};

export default CategoryLoader;
