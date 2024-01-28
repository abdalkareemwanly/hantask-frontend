import { useState } from "react";
import axiosClient from "../../../axios-client";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { useQueryHook } from "../../../hooks/useQueryHook";
import PageTitle from "../../../Components/PageTitle";
import TableData from "../../../Components/TableData";
import { HiDotsVertical } from "react-icons/hi";
import { Page } from "../../../Components/StyledComponents";
import Button from "../../../Components/Button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";
import { formatMoney } from "../../../functions/price";

const getData = async () => {
  const res = await axiosClient.get("/buyer/comments");
  return res;
};

const acceptOrderFun = async ({ id, status }) => {
  const res = await axiosClient.get(
    `/buyer/comment/changeStatusMethod/${id}?status=${status}`
  );
  return res;
};

const Orders = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");
  const {
    data: orders,
    errors,
    isLoading,
    refetch,
  } = useQueryHook(["orders", page], getData);
  const changeStatusMutation = useMutationHook(acceptOrderFun, [
    "orders",
    page,
  ]);

  const acceptFunc = async (id, status) => {
    const toastId = toast.loading("deleting..");
    try {
      const user = await changeStatusMutation.mutateAsync({ id, status });
      toast.update(toastId, {
        type: "success",
        render: user.mes,
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

  const handleChangeStatus = (id, status) => {
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
        acceptFunc(id, status);
      }
    });
  };

  const columns = [
    {
      name: "post",
      width: "30%",
      selector: (row) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-[120px] h-[100px] rounded-md"
              src={`https://api.hantask.at/public/${row.post_image}`}
              alt=""
            />
            <div className="flex flex-col gap-1">
              <span>
                <span className="font-semibold"> post title: </span>
                <span className="text-secondary-text">{row.post_title}</span>
              </span>
              <span>
                <span className="font-semibold"> post deadline: </span>
                <span className="text-secondary-text">{row.post_deadLine}</span>
              </span>
              <span>
                <span className="font-semibold">post budget: </span>
                <span className="text-secondary-text">
                  {formatMoney(Number(row.post_budget))}
                </span>
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: "service provider",
      width: "30%",
      selector: (row) => {
        return (
          <div className="flex flex-col gap-1">
            <span>
              <span className="font-semibold"> service provider name: </span>
              <span className="text-secondary-text">{row.seller_name}</span>
            </span>
            <span>
              <span className="font-semibold"> service provider email: </span>
              <span className="text-secondary-text">{row.seller_email}</span>
            </span>
            <span>
              <span className="font-semibold"> service provider phone: </span>
              <span className="text-secondary-text">{row.seller_phone}</span>
            </span>
            <span>
              <span className="font-semibold">service provider deadline: </span>
              <span className="text-secondary-text">{row.dead_line}</span>
            </span>
            <span>
              <span className="font-semibold"> service provider budget: </span>
              <span className="text-secondary-text">
                {formatMoney(Number(row.budget))}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      name: "order description",
      width: "10%",
      selector: (row) => {
        return (
          <div>
            <Button
              isLink={false}
              title={"show"}
              color={"bg-blueColor"}
              onClickFun={() => {
                setIsModalOpen(true);
                setSelectedDesc(row.comment);
              }}
            />
          </div>
        );
      },
    },
    {
      width: "10%",
      name: "order status",
      selector: (row) => {
        return (
          <div>
            {row.status == 0
              ? "pending"
              : row.status == 1
              ? "accepted"
              : "denied"}
          </div>
        );
      },
    },
    {
      name: "actions",
      width: "20%",
      selector: (row) => {
        return (
          <div className="flex gap-1">
            <Button
              isLink={false}
              color={"bg-greenColor"}
              title={"confirm"}
              onClickFun={() => handleChangeStatus(row.id, 1)}
            />
            <Button
              isLink={false}
              color={"bg-redColor"}
              title={"deny"}
              onClickFun={() => handleChangeStatus(row.id, 2)}
            />
          </div>
        );
      },
    },
  ];
  console.log(orders);
  return (
    <Page>
      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <>
              <div className="flex flex-col gap-2 w-[350px]">
                <span className="font-bold text-xl">description:</span>
                <span>{selectedDesc}</span>
              </div>
            </>
          }
        />
      )}
      <PageTitle text={"all orders"} />
      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={false}
          response={orders}
          actualData={orders?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no users to show!"}
        />
      </div>
    </Page>
  );
};

export default Orders;
