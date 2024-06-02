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
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async () => {
  const res = await axiosClient.get(`/seller/post/savedPosts`);
  return res.data.saved_posts;
};
const changeStatusFunc = async (id) => {
  const res = await axiosClient.post(`/site/post/saved`, { post_id: id });
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
  } = useQueryHook(["savedPosts"], getData);

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "savedPosts",
  ]);

  console.log(savedPosts);

  const handleDeleteClick = async (id) => {
    console.log(id);
    const toastId = toast.loading("submitting, please wait......");
    try {
      const post = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: post.data.mes,
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
      <PageTitle text={"manage saved deals"} />
      <div className="flex flex-wrap gap-6 my-4">
        {savedPosts?.length > 0 ? (
          savedPosts?.map((ele) => (
            <div
              key={ele.id}
              className="flex flex-col gap-2 flex-grow-0 flex-1 md:flex-[48%] rounded-md bg-blocks-color component-shadow"
            >
              <div className="flex gap-1 items-center p-4">
                <Button
                  goto={`/deal/${ele.post.id}`}
                  isLink={true}
                  hoverStyles={"rounded-full hover:bg-blueColor"}
                  Icon={<IoEye size={20} className="text-primary-text" />}
                />

                <Button
                  hoverStyles={"rounded-full  hover:bg-redColor"}
                  isLink={false}
                  onClickFun={() => handleDeleteClick(ele.post.id)}
                  Icon={<MdDelete size={20} className="text-primary-text" />}
                />
              </div>
              <div className="flex flex-col gap-4">
                <img
                  src={`${import.meta.env.VITE_POSTS_IMAGES_URL}${
                    ele.post.image
                  }`}
                  className="w-full h-[250px] object-cover"
                />
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="text-2xl font-semibold">{ele.post.title}</h3>
                  <p className="text-secondary-text">
                    budjet: ${ele.post.budget}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-greenColor w-full bg-opacity-50 rounded-md  text-primary-text p-4">
            no saved deals yet!
          </div>
        )}
      </div>
    </Page>
  );
};

export default SavedPosts;
