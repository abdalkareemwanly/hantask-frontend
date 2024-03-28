import { Banner } from "../home/Homepage";
import BlogCard from "./components/BlogCard";

const Blogs = () => {
  return (
    <div>
      <Banner />
      <div className="flex flex-col gap-8 my-12  lg:px-32 md:px-12  px-6 py-12">
        <h2 className="text-3xl font-bold">blogs</h2>
        <div className="grid lg:grid-cols-3 2xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8 items-start justify-center">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
