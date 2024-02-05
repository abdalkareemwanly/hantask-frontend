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
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useMutationHook } from "../../../hooks/useMutationHook";

const getData = async () => {
  const res = await axiosClient.get("/buyer/posts");
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/buyer/post/delete/${id}`);
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/buyer/post/changeStatusMethod/${id}`);
  return res;
};

const Jobs = () => {
  const [page, setPage] = useState(1);
  const {
    data: jobs,
    errors,
    isLoading,
    refetch,
  } = useQueryHook(["jobs", page], getData);
  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "jobs",
    page,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, ["jobs", page]);
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFun(id);
      }
    });
  };
  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const user = await deleteMutation.mutateAsync(id);
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
      <PageTitle
        text={"all jobs"}
        right={
          <div>
            <Button
              isLink={true}
              color={"bg-greenColor"}
              title={"add new job"}
              goto={"/customer/newJob"}
            />
          </div>
        }
      />
      <div className="flex flex-wrap gap-6 my-4">
        {jobs.data.data.map((ele) => (
          <div
            key={ele.id}
            className="flex flex-col gap-2 flex-grow-0 flex-[48%] rounded-md bg-blocks-color component-shadow"
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
                goto={`/job-detail/${ele.id}`}
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
                src={`${import.meta.env.VITE_WEBSITE_URL}${ele.image}`}
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
    </Page>
  );
};

export default Jobs;
