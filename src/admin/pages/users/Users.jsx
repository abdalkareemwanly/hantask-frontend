import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { AddUser } from "./components/AddUser";
import { EditUser } from "./components/EditUser";
import Swal from "sweetalert2";
import { ErrorIcon, SuccessIcon } from "../../../Components/Icons";
import { useNavigate } from "react-router-dom";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/users?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/changeStatusMethod/${id}`);
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/archiveMethod/${id}`);
  return res;
};

const Users = () => {
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  let hasShowPermission = hasPermissionFun("showUsers");
  let hasAddPermission = hasPermissionFun("addUser");
  let hasEditPermission = hasPermissionFun("editUser");
  let hasArchivePermission = hasPermissionFun("archiveUser");
  let hasChangeMethod = hasPermissionFun("archiveUser");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, queryClient } = useQueryHook(
    ["users", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "users",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "users",
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
  // Prefetch the next page!
  useEffect(() => {
    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["users", page + 1, searchTerm],
        queryFn: () => getData(page + 1),
        staleTime: 60 * 60 * 1000,
      });
    }, 500);
  }, [users, page, queryClient, searchTerm]);

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
      sortable: true,
    },
    {
      name: "username",
      selector: (row) => row.username,
    },
    {
      name: "full name",
      selector: (row) => row.name,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
    },
    {
      name: "status",
      selector: (row) =>
        row.user_status == 1 ? (
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
            {hasArchivePermission && (
              <Button
                isLink={false}
                color={"bg-redColor"}
                title={"archive"}
                onClickFun={() => handleDelete(row.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  if (hasShowPermission === false) return nav("/admin/dashboard");
  return (
    <Page>
      <PageTitle
        text={"manage all users"}
        right={
          hasAddPermission && (
            <div>
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={"add new"}
                onClickFun={() => setIsAddModalOpen((prev) => !prev)}
              />
            </div>
          )
        }
      />
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditUser data={clickedRow} setIsModalOpen={setIsModalOpen} />
          }
        />
      )}

      {isAddModalOpen && (
        <ModalContainer
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          component={<AddUser setIsAddModalOpen={setIsAddModalOpen} />}
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={true}
          response={users}
          actualData={users?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no users to show!"}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </Page>
  );
};

export default Users;
