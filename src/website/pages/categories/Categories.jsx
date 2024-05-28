import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
import Category from "../../components/common/Category";
import CategoryLoader from "../../components/common/CategoryLoader";
import TitleLine from "../../components/common/TitleLine";

function WebSiteCategories(props) {
  const { categories } = useGlobalDataContext();
  return (
    <>
      <div className="sm:w-[90%] sm:mx-[auto] w-[96%] mx-[2%] my-[30px]">
        <h3 className="font-[600] text-[32px] m-[-10px 0 0]">Categories</h3>
        <TitleLine />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8 lg:gap-6 mt-[30px]">
          {categories
            ? categories.map((item, index) => {
                return (
                  <Category
                    key={index}
                    name={item.name}
                    id={item.id}
                    image={item.image}
                  />
                );
              })
            : Array.from(Array(9).keys()).map((item, index) => {
                return (
                  <div key={index} className="flex gap-4">
                    <CategoryLoader key={index} />
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default WebSiteCategories;
