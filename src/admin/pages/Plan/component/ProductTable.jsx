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
    `/admin/paypal/products/all?page=${page}${
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
  const res = await axiosClient.get(`/admin/paypal/products/${id}/delete`);
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
    data: products,
    queryClient,
    isError,
  } = useQueryHook(
    ["products", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "products",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "products",
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
      const product = await changeStatusMutation.mutateAsync(id);
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

  const deleteFun = async (id) => {
    const toastId = toast.loading("deleting..");
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
        queryKey: ["products", page + 1, searchTerm],
        queryFn: () => getData(page + 1),
        staleTime: 60 * 60 * 1000,
      });
    }, 500);
  }, [products, page, queryClient, searchTerm]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "name",
      selector: (row) => row.name,
      maxWidth: "10%",
    },
    {
      name: "description",
      selector: (row) => row.description,
    },
    {
      name: "stripe_id",
      selector: (row) => row.stripe_id,
    },
    {
      name: "paypal_id",
      selector: (row) => row.paypal_id,
    },
    {
      name: "type",
      selector: (row) => row.type,
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
                color={"bg-redColor"}
                title={"delete"}
                onClickFun={() => deleteFunc(row.id)}
              />
            )}
          </div>
        );
      },
    },
  ];
  if (isError) <NetworkErrorComponent />;

  if (hasShowPermission === false) return nav("/admin/dashboard");
  return (
    <div className="my-4">
      <TableData
        columns={columns}
        enableSearch={true}
        response={products}
        actualData={products?.data.data}
        setPage={setPage}
        paginationBool={true}
        noDataMessage={"no users to show!"}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}
