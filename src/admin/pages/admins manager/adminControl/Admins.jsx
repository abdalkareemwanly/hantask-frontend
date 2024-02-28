import { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import PageTitle from "../../../../Components/PageTitle";
import { Page } from "../../../../Components/StyledComponents";
import TableData from "../../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../../Components/ModalContainer";
import axiosClient from "../../../../axios-client";
import { EditAdmin } from "./components/EditAdmin";
import { AddAdmin } from "./components/AddAdmin";
import useCheckPermission from "../../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import Swal from "sweetalert2";

const getAdmins = async () => {
  const res = await axiosClient.get("/admin/all");
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/role/delete/${id}`);
  return res;
};

const Admins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  // Check for specific permissions
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  const hasShowPermission = hasPermissionFun("allAdmin");
  const hasAddPermission = hasPermissionFun("storeAdmin");
  const hasEditPermission = hasPermissionFun("updateProfileAdmin");
  const hasDeletePermission = hasPermissionFun("deleteCategory");

  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    const res = await axiosClient.get("/admin/roles");
    setRoles(res.data?.data);
  };

  const [page, setPage] = useState(1);
  const { data: admins, queryClient } = useQueryHook(
    ["admins", page],
    () => getAdmins(page),
    "paginate",
    page
  );

  useEffect(() => {
    getRoles();
  }, []);

  const deleteMutation = useMutationHook(deleteFunc, ["admins", page]);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
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
      name: "name",
      selector: (row) => row.name,
      maxWidth: "15%",
    },
    {
      name: "username",
      selector: (row) => row.username,
      maxWidth: "15%",
    },
    {
      name: "email",
      selector: (row) => row.email,
      maxWidth: "15%",
    },
    {
      name: "role",
      selector: (row) => row.role,
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
            <Button
              isLink={false}
              color={"bg-redColor"}
              title={"delete"}
              onClickFun={() => handleDelete(row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    hasShowPermission && (
      <Page>
        <PageTitle
          text={"manage all admins"}
          right={
            hasAddPermission && (
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor"}
                  title={"add"}
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
              <EditAdmin
                data={clickedRow}
                roles={roles}
                getAdmins={getAdmins}
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
              <AddAdmin
                getAdmins={getAdmins}
                roles={roles}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={false}
            response={admins}
            actualData={admins?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no users to show!"}
          />
        </div>
      </Page>
    )
  );
};

export default Admins;
