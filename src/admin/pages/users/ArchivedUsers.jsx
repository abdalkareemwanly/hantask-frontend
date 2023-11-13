import { toast } from "react-toastify";
import Button from "../../../Components/Button";
import ModalContainer from "../../../Components/ModalContainer";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";

const ArchivedUsers = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const getUsers = async () => {
    const res = await axiosClient.get("/admin/user/viewArchived");
    setUsers(res.data?.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleRestore = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/user/unarchiveMethod/${id}`);
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
      getUsers();
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
  const handleDelete = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(`/admin/user/deleteMethod/${id}`);
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
      getUsers();
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
        row.status == 1 ? (
          <h1 className="bg-greenColor p-2 block rounded-md">active</h1>
        ) : (
          <h1 className="bg-redColor p-2 block rounded-md">unactive</h1>
        ),
      maxWidth: "10%",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"restore account"}
              onClickFun={() => handleRestore(row.id)}
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
      <PageTitle text={"manage all archived users"} />

      <div className="my-4">
        <TableData columns={columns} data={users} />
      </div>
    </Page>
  );
};

export default ArchivedUsers;
