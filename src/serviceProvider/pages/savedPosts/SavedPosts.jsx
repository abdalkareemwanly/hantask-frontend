import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Loader from "../../../Components/Loader";
import { toast } from "react-toastify";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { PaginationComponent } from "../../../Components/PaginationComponent";

const getData = async (page) => {
  const res = await axiosClient.get(`/buyer/posts?page=${page}`);
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/buyer/post/changeStatusMethod/${id}`);
  return res;
};

const SavedPosts = () => {
  const [page, setPage] = useState(1);
  const {
    data: jobs,
    errors,
    isLoading,
    refetch,
  } = useQueryHook(["jobs", page], () => getData(page));
  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "jobs",
    page,
  ]);

  const handleChangeStatus = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const user = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: user.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Page>
      <PageTitle text={"saved deals"} />
      <div className="flex flex-wrap gap-6 my-4">
        {jobs.data.data.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col gap-2 flex-grow-0 flex-1 md:flex-[48%] rounded-md bg-blocks-color component-shadow"
          >
            <div className="flex gap-1 items-center p-4">
              <div>
                <label>
                  <div className="switch">
                    <input
                      id={`check${ele.id}`}
                      type="checkbox"
                      name={`check${ele.id}`}
                      hidden
                      checked={ele.status === 0 ? false : true}
                      onChange={() => handleChangeStatus(ele.id)}
                    />
                    <div className="slider"></div>
                    <label htmlFor={`check${ele.id}`}>
                      Job is{" "}
                      <span className="text-xl font-medium">
                        {ele.status === 0 ? "close" : "open"}
                      </span>
                    </label>
                  </div>
                </label>
              </div>
              <Button
                goto={`/deal/${ele.id}`}
                isLink={true}
                hoverStyles={"rounded-full hover:bg-blueColor"}
                Icon={<IoEye size={20} className="text-primary-text" />}
              />
              <Button
                hoverStyles={"rounded-full hover:bg-orangeColor"}
                isLink={true}
                goto={`/customer/editJob/${ele.id}`}
                Icon={<FaRegEdit size={20} className="text-primary-text" />}
              />
              <Button
                hoverStyles={"rounded-full  hover:bg-redColor"}
                isLink={false}
                onClickFun={() => handleDeleteClick(ele.id)}
                Icon={<MdDelete size={20} className="text-primary-text" />}
              />
            </div>
            <div className="flex flex-col gap-4">
              <img
                src={`${import.meta.env.VITE_POSTS_IMAGES_URL}${ele.image}`}
                className="w-full h-[250px] object-cover"
              />
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-2xl font-semibold">{ele.title}</h3>
                <p className="text-secondary-text">budjet: ${ele.budget}</p>
                <p className="text-secondary-text">
                  status: {ele.status === 0 ? "inactive" : "active"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaginationComponent data={jobs} setPage={setPage} />
    </Page>
  );
};

export default SavedPosts;
