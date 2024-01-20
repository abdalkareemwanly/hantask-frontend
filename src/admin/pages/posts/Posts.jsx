import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import TableData from "../../../Components/TableData";
import Button from "../../../Components/Button";
import { ErrorIcon, SuccessIcon } from "../../../Components/Icons";
import { useState } from "react";
const getData = async (page = 1, searchTerm) => {
  const res = await axiosClient.get(
    `/admin/posts?page=${page}${
      searchTerm.length > 0 ? `&search=${searchTerm}` : ""
    }`
  );
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
    queryFn: getData(page, searchTerm),
  });

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
            hi
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
