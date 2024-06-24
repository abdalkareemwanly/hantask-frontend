import React, { useEffect, useState } from "react";
import { Page } from "../../../../Components/StyledComponents";
import PageTitle from "../../../../Components/PageTitle";
import TableData from "../../../../Components/TableData";
import axiosClient from "../../../../axios-client";
import Button from "../../../../Components/Button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useCheckPermission from "../../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import NetworkErrorComponent from "../../../../Components/NetworkErrorComponent";

const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `/admin/paypal/Plans/all?page=${page}${
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
  const res = await axiosClient.get(`/admin/paypal/plans/${id}/delete`);
  return res;
};

export default function ProductTable() {
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
  const {
    data: plans,
    queryClient,
    isError,
  } = useQueryHook(
    ["plans", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "plans",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "plans",
    page,
    searchTerm,
  ]);

  const deleteFun = async (id) => {
    const toastId = toast.loading("submitting, please wait...");
    try {
      const product = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: product.mes,
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

  useEffect(() => {
    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["plans", page + 1, searchTerm],
        queryFn: () => getData(page + 1),
        staleTime: 60 * 60 * 1000,
      });
    }, 500);
  }, [plans, page, queryClient, searchTerm]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxWidth: "8%",
    },
    {
      name: "name",
      selector: (row) => row.name,
      maxWidth: "8%",
    },
    {
      name: "stripe_plan_id",
      selector: (row) => row.stripe_plan_id,
    },
    {
      name: "paypal_plan_id",
      selector: (row) => row.paypal_plan_id,
    },
    {
      name: "price",
      selector: (row) => row.price,
      maxWidth: "8%",
    },
    {
      name: "interval",
      selector: (row) => row.interval,
      maxWidth: "8%",
    },
    {
      name: "int_count",
      selector: (row) => row.interval_count,
      maxWidth: "8%",
    },
    {
      name: "currency",
      selector: (row) => row.currency,
      maxWidth: "8%",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            {hasEditPermission && (
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

  if (isError) return <NetworkErrorComponent />;
  if (hasShowPermission === false) return nav("/admin/dashboard");
  return (
    <div className="my-4">
      <TableData
        columns={columns}
        enableSearch={true}
        response={plans}
        actualData={plans?.data.data}
        setPage={setPage}
        paginationBool={true}
        noDataMessage={"no users to show!"}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
