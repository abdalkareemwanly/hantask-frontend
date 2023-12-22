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

const Admins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  // Check for specific permissions
  const userPermissions = JSON.parse(localStorage.getItem("USER")).permission;
  const { hasPermissionFun } = useCheckPermission(userPermissions);
  const nav = useNavigate();

  const [roles, setRoles] = useState([]);
  const getRoles = async () => {
    const res = await axiosClient.get("/admin/roles");
    setRoles(res.data?.data);
  };
  // useEffect(() => {
  //   const hasPermission = hasPermissionFun("showUsers");
  //   if (hasPermission) {
  //     console.log(hasPermission);
  //   } else {
  //     nav("/admin/dashboard");
  //   }
  // }, []);
  // Check for specific permissions
  const [admins, setAdmins] = useState([]);
  const getAdmins = async () => {
    const res = await axiosClient.get("/admin/all");
    setAdmins(res.data?.data);
  };

  useEffect(() => {
    getAdmins();
    getRoles();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/role/delete/${id}`);
    console.log(res);
    if (res.data.success == false) {
      toast.update(toastId, {
        type: "error",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } else {
      getRoles();
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
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
            <Button
              isLink={false}
              color={"bg-orangeColor"}
              title={"edit"}
              onClickFun={() => editBtnFun(row)}
            />
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
    <Page>
      <PageTitle
        text={"manage all admins"}
        right={
          <div>
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"add"}
              onClickFun={() => setIsAddModalOpen((prev) => !prev)}
            />
          </div>
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
          data={admins}
          paginationBool={true}
          noDataMessage={"no admins to show!"}
        />
      </div>
    </Page>
  );
};

export default Admins;
