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

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [clickedRow, setClickedRow] = useState();

  const getRoles = async () => {
    const res = await axiosClient.get("/admin/roles");
    setRoles(res.data?.data);
  };

  useEffect(() => {
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
      name: "role",
      selector: (row) => row.name,
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
            <Button
              isLink={true}
              color={"bg-blueColor"}
              goto={`${row.id}`}
              title={"permissions control"}
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
        text={"manage all roles"}
        right={
          <div>
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"add new"}
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
          data={roles}
          paginationBool={true}
          noDataMessage={"no roles to show!"}
        />
      </div>
    </Page>
  );
};

export default Roles;
