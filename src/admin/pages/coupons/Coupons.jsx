import { useEffect, useState } from "react";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import axiosClient from "../../../axios-client";
import { SuccessIcon, ErrorIcon } from "../../../Components/Icons";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import Swal from "sweetalert2";
import { AddCoupon } from "./components/AddCoupon";
import { EditCoupon } from "./components/EditCoupon";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `admin/subscription/coupons?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};
const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(
    `/admin/plan/coupon/changeStatusMethod/${id}`
  );
  return res;
};

const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/plan/coupon/deleteMethod/${id}`);
  return res;
};

const Coupons = () => {
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
  const [plans, setPlans] = useState();

  const { data: categories, queryClient } = useQueryHook(
    ["coupons", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const getPlans = async (signal) => {
    const res = await axiosClient.get(`admin/plans`, { signal: signal });
    setPlans(res.data.data);
  };

  useEffect(() => {
    const abort1 = new AbortController();
    const signal = abort1.signal;

    getPlans(signal);

    return () => {
      abort1.abort();
    };
  }, []);

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "coupons",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "coupons",
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
      name: "amount off",
      selector: (row) => row.amount,
      maxWidth: "15%",
    },
    {
      name: "plan name",
      selector: (row) => row?.plan_name,
      maxWidth: "30%",
    },
    {
      name: "expiration date",
      selector: (row) => row?.expire_date,
      maxWidth: "30%",
    },
    {
      name: "currency",
      selector: (row) => row?.currency,
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
          text={"manage all coupons"}
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
              <EditCoupon
                data={clickedRow}
                plans={plans}
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
              <AddCoupon plans={plans} setIsAddModalOpen={setIsAddModalOpen} />
            }
          />
        )}

        <div className="my-4">
          <TableData
            columns={columns}
            enableSearch={true}
            response={categories}
            actualData={categories?.data.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no coupons to show!"}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </Page>
    )
  );
};

export default Coupons;
