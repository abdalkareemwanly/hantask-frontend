import { toast } from "react-toastify";
import Button from "../../../Components/Button";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import axiosClient from "../../../axios-client";
import { ErrorIcon, SuccessIcon } from "../../../Components/Icons";
import Swal from "sweetalert2";
import useCheckPermission from "../../../hooks/checkPermissions";
import { useNavigate } from "react-router-dom";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";
const getData = async (page = 0) => {
  const res = await axiosClient.get(
    "admin/user/viewArchived" + "?page=" + page
  );
  return res;
};

const restoreFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/unarchiveMethod/${id}`);
  return res;
};
const deleteFunc = async (id) => {
  const res = await axiosClient.get(`/admin/user/deleteMethod/${id}`);
  return res;
};

const ArchivedUsers = () => {
  const { hasPermissionFun } = useCheckPermission();
  const nav = useNavigate();
  const hasShowPermission = hasPermissionFun("showArchivedUser");
  const hasRestorePermission = hasPermissionFun("restoreUser");
  const hasDeletePermission = hasPermissionFun("deleteUser");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: archivedUsers,
    isPlaceholderData,
    queryClient,
    isError,
  } = useQueryHook(
    ["archivedUsers", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );
  // Prefetch the next page!
  useEffect(() => {
    setTimeout(() => {
      if (!isPlaceholderData) {
        queryClient.prefetchQuery({
          queryKey: ["archivedUsers", page + 1, searchTerm],
          queryFn: () => getData(page + 1),
          staleTime: 60 * 60 * 1000,
        });
      }
    }, 500);
  }, [archivedUsers, isPlaceholderData, page, queryClient]);
  const restoreMutation = useMutationHook(restoreFunc, [
    "archivedUsers",
    page,
    searchTerm,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, [
    "archivedUsers",
    page,
    searchTerm,
  ]);

  const handleRestore = async (id) => {
    const toastId = toast.loading("restoring...");
    try {
      const res = await restoreMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: res.data.mes,
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
    const toastId = toast.loading("submitting, please wait...");
    try {
      const res = await deleteMutation.mutateAsync(id);
      toast.update(toastId, {
        type: "success",
        render: res?.data?.mes,
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
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
        row.user_status == 1 ? (
          <SuccessIcon
            className="p-2 block rounded-md text-greenColor"
            size={40}
          />
        ) : (
          <ErrorIcon
            className=" p-2 block rounded-md text-redColor"
            size={40}
          />
        ),
      maxWidth: "10%",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            {hasRestorePermission && (
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={"restore account"}
                onClickFun={() => handleRestore(row.id)}
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
  if (isError) return <NetworkErrorComponent />;

  if (hasShowPermission === false) return nav("/admin/dashboard");

  return (
    <Page>
      <PageTitle text={"manage all archived users"} />

      <TableData
        columns={columns} //array for the columns i want
        enableSearch={true} //true or false to enable search functionality
        response={archivedUsers} // the response i get from the request to get pagination properties from api
        actualData={archivedUsers?.data.data} //the data i want to display in the table
        setPage={setPage} //change the page for pagination functionality
        paginationBool={true} //true or false to enable pagination in the table
        noDataMessage={"no archived users to show!"} //if there no data
        setSearchTerm={setSearchTerm} //the search term state that the search functionality depends on
      />
    </Page>
  );
};

export default ArchivedUsers;
