import { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import PageTitle from "../../../../Components/PageTitle";
import { Page } from "../../../../Components/StyledComponents";
import TableData from "../../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../../Components/ModalContainer";
import axiosClient from "../../../../axios-client";
import { AddRole } from "./components/AddRole";
import { EditRole } from "./components/EditRole";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import useCheckPermission from "../../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import NetworkErrorComponent from "../../../../Components/NetworkErrorComponent";
const getRoles = async () => {
  const res = await axiosClient.get("/admin/roles");
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/role/delete/${id}`);
  return res;
};
const Roles = () => {
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  const hasShowPermission = hasPermissionFun("showRoles");
  const hasAddPermission = hasPermissionFun("addRole");
  const hasEditPermission = hasPermissionFun("updateRole");
  const hasDeletePermission = hasPermissionFun("deleteRole");
  const hasPermissionsCheck = hasPermissionFun("Permission");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [page, setPage] = useState(1);
  const {
    data: roles,
    queryClient,
    isError,
  } = useQueryHook(["roles", page], () => getRoles(page), "paginate", page);
  const deleteMutation = useMutationHook(deleteFunc, ["roles", page]);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
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
        deleteCall(id);
      }
    });
  };
  const deleteCall = async (id) => {
    const toastId = toast.loading("processing");
    try {
      const role = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: role.mes,
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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxWidth: "9%",
    },
    {
      name: "role",
      selector: (row) => row.name,
      maxWidth: "15%",
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
            {hasDeletePermission && (
              <Button
                isLink={false}
                color={"bg-redColor"}
                title={"delete"}
                onClickFun={() => handleDelete(row.id)}
              />
            )}
            {hasPermissionsCheck && (
              <Button
                isLink={true}
                color={"bg-blueColor"}
                goto={`${row.id}`}
                title={"permissions control"}
                onClickFun={() => handleDelete(row.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
  if (isError) <NetworkErrorComponent />;

  return (
    hasShowPermission && (
      <Page>
        <PageTitle
          text={"manage all roles"}
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
              <EditRole
                data={clickedRow}
                getRoles={getRoles}
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
              <AddRole
                getRoles={getRoles}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={false}
            response={roles}
            actualData={roles?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no users to show!"}
          />
        </div>
      </Page>
    )
  );
};

export default Roles;
