import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddSubCategory } from "./components/AddSubCategory";
import { EditSubCategory } from "./components/EditSubCategory";
import { SuccessIcon, ErrorIcon } from "../../../Components/Icons";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useGlobalDataContext } from "../../../contexts/GlobalDataContext";
const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/subCategories?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};
const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(
    `/admin/subCategory/changeStatusMethod/${id}`
  );
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/subCategory/deleteMethod/${id}`);
  return res;
};

const SubCategories = () => {
  const { hasPermissionFun } = useCheckPermission();

  const hasShowPermission = hasPermissionFun("showSubCategories");
  const hasAddPermission = hasPermissionFun("addSubCategory");
  const hasEditPermission = hasPermissionFun("editSubCategory");
  const hasDeletePermission = hasPermissionFun("deleteSubCategory");
  const hasChangeMethod = hasPermissionFun("changeStatusSubCategory");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { categories } = useGlobalDataContext();
  const { data: subCategories, queryClient } = useQueryHook(
    ["subCategories", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );
  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "subCategories",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "subCategories",
    page,
    searchTerm,
  ]);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };
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

  return (
    hasShowPermission && (
      <Page>
        <PageTitle
          text={"manage all sub categories"}
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
              <EditSubCategory
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
            component={<AddSubCategory setIsAddModalOpen={setIsAddModalOpen} />}
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={true}
            response={subCategories}
            actualData={subCategories?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no sub categories to show!"}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </Page>
    )
  );
};

export default SubCategories;
