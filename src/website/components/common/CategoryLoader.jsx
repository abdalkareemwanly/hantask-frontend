const CategoryLoader = () => {
  return (
    <div
      role="status"
      className=" animate-pulse  flex gap-6 w-[300px] h-[150px] items-center py-3 px-6 component-shadow border rounded-lg"
    >
      <span className="w-[100px] h-[100px] rounded-full bg-gray-300  flex justify-center items-center"></span>
      <span className="rounded-full bg-gray-300 w-20 h-4"></span>
    </div>
  );
};

export default CategoryLoader;
