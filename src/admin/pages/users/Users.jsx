import { useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import EditUserModal from "./components/EditUserModal";
import ReusableForm from "../../../Components/ReusableForm";
import { ToastContainer, toast } from "react-toastify";

const EditUser = ({ data }) => {
  let template = {
    title: "update user data",
    fields: [
      {
        title: "user name",
        name: "username",
        type: "text",
        value: data?.userName,
      },
      {
        title: "full name",
        name: "fullname",
        type: "text",
        value: data?.fullName,
      },
    ],
  };

  const onSubmit = async (values) => {
    console.log(values);
  };

  const validate = (watchValues, methods) => {
    const { errors, setError, clearErrors, setValue, resetFields } = methods;
    if (watchValues?.username === data?.userName) {
      setError("username", {
        type: "manual",
        message: "it can't be the same name",
      });
    }
  };
  return (
    <div className="p-8 bg-background-color rounded-lg component-shadow w-[500px]">
      <ReusableForm
        template={template}
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"sign in"}
      />
    </div>
  );
};

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clickedRow, setClickedRow] = useState();

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };
  const columns = [
    {
      name: "username",
      selector: (row) => row.userName,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
    {
      name: "full name",
      selector: (row) => row.fullName,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            <Button
              isLink={false}
              color={"bg-redBtn"}
              title={"edit"}
              onClickFun={() => editBtnFun(row)}
            />
            <Button
              isLink={false}
              // goto={`../Chat Users/${row.id}`}
              color={"bg-blueBtn"}
              title={"change status"}
              onClickFun={() =>
                toast.success("Success Notification !", {
                  position: toast.POSITION.TOP_CENTER,
                })
              }
            />

            {/* <Button
              isLink={true}
              goto={`../Chat Users/${row.id}`}
              color={"bg-greenBtn"}
              title={"hello"}
              onClickFun={() => console.log(row)}
            /> */}
          </div>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      userName: "kareem",
      year: "1988",
      fullName: "kareem wanly",
    },
    {
      id: 2,
      userName: "moayad",
      year: "1984",
      fullName: "moayad altalb",
    },
    {
      id: 3,
      userName: "mohammed",
      year: "1988",
      fullName: "mohammed emerly",
    },
  ];

  return (
    <Page>
      <PageTitle text={"manage all users"} />
      {isModalOpen && (
        <EditUserModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={<EditUser data={clickedRow} />}
        />
      )}

      <TableData columns={columns} data={data} />
    </Page>
  );
};

export default Users;
