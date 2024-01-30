import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import TableData from "../../../Components/TableData";
import Button from "../../../Components/Button";
import { ErrorIcon, SuccessIcon } from "../../../Components/Icons";
import { useState } from "react";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { toast } from "react-toastify";
const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `/admin/posts?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
  return res;
};

const changeStatusFunc = async (id) => {
  const res = await axiosClient.get(`/admin/post/changeStatusMethod/${id}`);
  return res;
};

const Posts = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: posts,
    error,
    isError,
    isFetching,
    status,
  } = useQuery({
    queryKey: ["posts", page, searchTerm],
    queryFn: () => getData(page, searchTerm),
  });

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "posts",
    page,
    searchTerm,
  ]);

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

  const columns = [
    {
      name: "title",
      selector: (row) => {
        return (
          <div className="flex items-center gap-3">
            <img
              src={`${
                import.meta.env.VITE_WEBSITE_URL + "/public" + row.image
              }`}
              className="w-[50px] h-[50px] rounded-full"
              alt=""
            />
            <span>{row.title}</span>
          </div>
        );
      },
      maxWidth: "15%",
    },
    {
      name: "buyer",
      selector: (row) => row.buyer_name,
      maxWidth: "10%",
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
      selector: (row) => row?.category_name,
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
            {row.status == 0 && (
              <Button
                title={"activite"}
                color={"bg-greenColor"}
                onClickFun={() => handleChangeStatus(row.id)}
              />
            )}
            {row.status == 1 && (
              <Button
                title={"deactivite"}
                color={"bg-redColor"}
                onClickFun={() => handleChangeStatus(row.id)}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Page>
      <PageTitle text={"review all posts"} />
      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={true}
          response={posts}
          actualData={posts?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no posts to show!"}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </Page>
  );
};

export default Posts;
