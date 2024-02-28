import { Link } from "react-router-dom";
import "../style/PostJobsCardLoader.css";

function PostJobsCardLoader() {
  return (
    <>
      <div
        role="status"
        className=" animate-pulse flex flex-col gap-2 w-[400px] py-3 px-6 component-shadow border rounded-lg"
      >
        <div className="flex justify-between items-center">
          <span className="rounded-full bg-gray-300 w-20 h-4"></span>
          <span className="w-[25px] h-[25px] rounded-full bg-gray-300  flex justify-center items-center"></span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="min-w-[70px] min-h-[70px] rounded-full flex justify-center items-center bg-gray-300 "></div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className="font-semibold w-[100%] h-4 bg-gray-300"></h3>
            <div className="flex items-center gap-4 bg-gray-300 w-full h-3 text-sm"></div>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-8"></div>
        <div className="border-t flex items-center py-2">
          <div className="flex items-center gap-1 justify-between flex-1 text-sm">
            <div className="bg-gray-300 w-20 h-4"></div>
            <div className="bg-gray-300 w-20 h-4"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJobsCardLoader;
