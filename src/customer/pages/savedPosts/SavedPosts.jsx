import { useState } from "react";
import Button from "../../../Components/Button";
import Loader from "../../../Components/Loader";
import PageTitle from "../../../Components/PageTitle";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { PaginationComponent } from "../../../Components/PaginationComponent";
import { toast } from "react-toastify";
import { Page } from "../../../Components/StyledComponents";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

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
    data: savedPosts,
    errors,
    isLoading,
    refetch,
    isError,
  } = useQueryHook(["savedPosts", page], () => getData(page));

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "savedPosts",
    page,
  ]);

  const handleChangeStatus = async (id) => {
    const toastId = toast.loading("submitting, please wait......");
    try {
      const res = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
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
  if (isError) return <NetworkErrorComponent />;

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
        {savedPosts?.data?.data?.map((ele) => (
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

      <PaginationComponent data={savedPosts} setPage={setPage} />
    </Page>
  );
};

export default SavedPosts;
