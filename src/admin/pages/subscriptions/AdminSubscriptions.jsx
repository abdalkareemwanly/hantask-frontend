import { useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import { AddSubscription } from "./components/AddSubscription";
import { EditSubscription } from "./components/EditSubscription";
const PLANSTYPES = [
  {
    id: 1,
    title: "month",
  },
  {
    id: 2,
    title: "year",
  },
];
const PAYMENTS_CURRENCY = [
  {
    id: 1,
    title: "usd",
  },
  {
    id: 2,
    title: "euro",
  },
];

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/plans?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/admin/category/changeStatusMethod/${id}`);
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/category/deleteMethod/${id}`);
  return res;
};

const Subscriptions = () => {
  // Check for specific permissions
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  const hasShowPermission = hasPermissionFun("showCategories");
  const hasAddPermission = hasPermissionFun("addCategory");
  const hasEditPermission = hasPermissionFun("editCategory");
  const hasDeletePermission = hasPermissionFun("deleteCategory");
  const hasChangeMethod = hasPermissionFun("changeStatusCategory");
  // Check for specific permissions

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: subscriptions, queryClient } = useQueryHook(
    ["subscriptions", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );
  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "subscriptions",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "subscriptions",
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
      const category = await changeStatusMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: category.mes,
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
      const category = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: category.mes,
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
      name: "interval",
      selector: (row) => row.interval,
      maxWidth: "15%",
    },
    {
      name: "price",
      selector: (row) => row?.price,
      maxWidth: "15%",
    },
    {
      name: "currency",
      selector: (row) => row?.currency,
      maxWidth: "15%",
    },
    {
      name: "interval_count",
      selector: (row) => row.interval_count,
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
          text={"manage all subscriptions"}
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
              <EditSubscription
                PLANSTYPES={PLANSTYPES}
                PAYMENTS_CURRENCY={PAYMENTS_CURRENCY}
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
              <AddSubscription
                PLANSTYPES={PLANSTYPES}
                PAYMENTS_CURRENCY={PAYMENTS_CURRENCY}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={true}
            response={subscriptions}
            actualData={subscriptions?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no subscriptions to show!"}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </Page>
    )
  );
};

export default Subscriptions;
