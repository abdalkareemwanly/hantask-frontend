import { useNavigate } from "react-router-dom";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useState } from "react";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosClient from "../../../axios-client";
import { Page } from "../../../Components/StyledComponents";
import PageTitle from "../../../Components/PageTitle";
import Button from "../../../Components/Button";
import ModalContainer from "../../../Components/ModalContainer";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import BlogCard from "./components/BlogCard";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";

const getData = async (page = 1) => {
  const res = await axiosClient.get(`admin/blogs/all?page=${page}`);
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.delete(`/admin/blogs/delete/${id}`);
  return res;
};

const AdminBlogs = () => {
  // Check for specific permissions
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  const hasShowPermission = hasPermissionFun("showCategories");
  const hasAddPermission = hasPermissionFun("addCategory");
  const hasEditPermission = hasPermissionFun("editCategory");
  const hasDeletePermission = hasPermissionFun("deleteCategory");
  const hasChangeMethod = hasPermissionFun("changeStatusCategory");
  // Check for specific permissions

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [page, setPage] = useState(1);

  const {
    data: blogs,
    queryClient,
    isError,
  } = useQueryHook(["blogs", page], () => getData(page), "paginate", page);

  const deleteMutation = useMutationHook(deleteFunc, ["blogs", page]);

  const editBtnFun = (data) => {
    setIsModalOpen(true);
    setClickedRow(data);
  };

  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const category = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: category.data.message,
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

  const handleDelete = (id) => {
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
  if (isError) <NetworkErrorComponent />;

  return (
    <Page>
      <PageTitle
        text={"all blogs"}
        right={
          <div>
            {hasAddPermission && (
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={"add new"}
                onClickFun={() => setIsAddModalOpen((prev) => !prev)}
              />
            )}
          </div>
        }
      />
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditBlog
              data={clickedRow}
              page={page}
              // getCategories={getCategories}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}

      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={
            <AddBlog
              // getCategories={getCategories}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}

      <div className="my-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.data?.data?.map((ele, i) => (
            <BlogCard
              key={i}
              data={ele}
              setEditModalOpen={editBtnFun}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export default AdminBlogs;
