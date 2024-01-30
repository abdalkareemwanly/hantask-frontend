import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddChildCategory } from "./components/AddChildCategory";
import { SuccessIcon, ErrorIcon } from "../../../Components/Icons";
import { EditChildCategory } from "./components/EditChildCategory";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import useCheckPermission from "../../../hooks/checkPermissions";
const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/childs?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/admin/child/changeStatusMethod/${id}`);
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/child/deleteMethod/${id}`);
  return res;
};

const ChildCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [clickedRow, setClickedRow] = useState();
  const { hasPermissionFun } = useCheckPermission();

  const hasShowPermission = hasPermissionFun("showChildCategories");
  const hasAddPermission = hasPermissionFun("addChildCategory");
  const hasEditPermission = hasPermissionFun("editChildCategory");
  const hasDeletePermission = hasPermissionFun("deleteChildCategory");
  const hasChangeMethod = hasPermissionFun("changeStatusChildCategory");
  const getCategories = async () => {
    const res = await axiosClient.get("/admin/categories");
    setCategories(res.data?.data);
  };
  const getSubCategories = async () => {
    const res = await axiosClient.get("/admin/subCategories");
    setSubCategories(res.data?.data);
  };
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: childCategories, queryClient } = useQueryHook(
    ["childCategories", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  useEffect(() => {
    setTimeout(() => {
      getSubCategories();
      getCategories();
    }, 500);
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "childCategories",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "childCategories",
    page,
    searchTerm,
  ]);
  const handleChangeStatus = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const subCategory = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: subCategory.mes,
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

  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const subCategory = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: subCategory.mes,
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxWidth: "9%",
    },
    {
      name: "name",
      selector: (row) => row.name,
      maxWidth: "15%",
    },
    {
      name: "slug",
      selector: (row) => row.slug,
      maxWidth: "15%",
    },
    {
      name: "description",
      selector: (row) =>
        row?.description?.length >= 50
          ? row?.description.substring(0, 50) + "..."
          : row?.description,
      maxWidth: "30%",
    },
    {
      name: "main category",
      selector: (row) => row?.categoryName,
      maxWidth: "30%",
    },
    {
      name: "sub category",
      selector: (row) => row?.subcategoryName,
      maxWidth: "30%",
    },
    {
      name: "status",
      selector: (row) =>
        row.status == 1 ? (
          <SuccessIcon
            className="p-2 block rounded-md text-greenColor"
            size={45}
          />
        ) : (
          <ErrorIcon
            className=" p-2 block rounded-md text-redColor"
            size={45}
          />
        ),
      maxWidth: "10%",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            {hasEditPermission && (
              <Button
                isLink={false}
                color={"bg-orangeColor"}
                title={"edit"}
                onClickFun={() => editBtnFun(row)}
              />
            )}
            {hasChangeMethod && (
              <Button
                isLink={false}
                color={"bg-blueColor"}
                title={"change status"}
                onClickFun={() => handleChangeStatus(row.id)}
              />
            )}
            {hasDeletePermission && (
              <Button
                isLink={false}
                color={"bg-redColor"}
                title={"delete"}
                onClickFun={() => handleDelete(row.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
  console.log(categories);

  return (
    hasShowPermission && (
      <Page>
        <PageTitle
          text={"manage all childs"}
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
              <EditChildCategory
                subCategories={subCategories}
                categories={categories}
                data={clickedRow}
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
              <AddChildCategory
                subCategories={subCategories}
                categories={categories}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={true}
            response={childCategories}
            actualData={childCategories?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no child categories to show!"}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </Page>
    )
  );
};

export default ChildCategories;
