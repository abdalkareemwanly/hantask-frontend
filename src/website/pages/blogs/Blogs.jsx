import { useState } from "react";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { Banner } from "../home/Homepage";
import BlogCard from "./components/BlogCard";
import axiosClient from "../../../axios-client";
import WebsiteLoader from "../../components/loader/WebsiteLoader";
import Pagination from "../../components/pagination/Pagination";
const getBlogs = async () => {
  const res = await axiosClient.get("/site/blogs/all");
  return res;
};
const Blogs = () => {
  const [page, setPage] = useState(1);

  const { data: blogs, isLoading } = useQueryHook(
    ["admins", page],
    () => getBlogs(page),
    "paginate",
    page
  );
  console.log(blogs);
  return (
    <div>
      <Banner />
      {isLoading ? (
        <WebsiteLoader />
      ) : (
        <div className="flex  flex-col gap-8 my-12  lg:px-32 md:px-12  px-6 py-12">
          <h2 className="text-3xl md:text-4xl  text-center font-bold">blogs</h2>
          <div className="grid lg:grid-cols-3 2xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8 items-start justify-center">
            {blogs.data.data.map((ele, i) => (
              <BlogCard key={i} data={ele} />
            ))}
          </div>
          <div className="flex justify-center">
            <Pagination data={blogs} setPage={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
