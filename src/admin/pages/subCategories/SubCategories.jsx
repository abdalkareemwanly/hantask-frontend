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

const SubCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clickedRow, setClickedRow] = useState();
  console.log(subCategories);

  const getCategories = async () => {
    const res = await axiosClient.get("/admin/categories");
    setCategories(res.data?.data);
  };

  const getSubCategories = async () => {
    const res = await axiosClient.get("/admin/subCategories");
    setSubCategories(res.data?.data);
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleChangeStatus = async (id) => {
    const toastId = toast.loading("processing");
    const res = await axiosClient.get(
      `/admin/subCategory/changeStatusMethod/${id}`
    );
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
      getSubCategories();
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
    const res = await axiosClient.get(`/admin/subCategory/deleteMethod/${id}`);
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
      getSubCategories();
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
            <Button
              isLink={false}
              color={"bg-orangeColor"}
              title={"edit"}
              onClickFun={() => editBtnFun(row)}
            />
            <Button
              isLink={false}
              color={"bg-blueColor"}
              title={"change status"}
              onClickFun={() => handleChangeStatus(row.id)}
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
        text={"manage all categories"}
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
            <EditSubCategory
              categories={categories}
              data={clickedRow}
              getSubCategories={getSubCategories}
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
            <AddSubCategory
              categories={categories}
              getSubCategories={getSubCategories}
              setIsAddModalOpen={setIsAddModalOpen}
            />
          }
        />
      )}

      <div className="my-4">
        <TableData
          columns={columns}
          data={subCategories}
          paginationBool={true}
          noDataMessage={"no categories to show!"}
        />
      </div>
    </Page>
  );
};

export default SubCategories;
