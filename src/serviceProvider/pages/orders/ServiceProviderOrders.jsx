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
import Loader from "../../../Components/Loader";

const getData = async () => {
  const res = await axiosClient.get("/seller/comments");
  return res;
};

const ServiceProviderOrders = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");
  const { data: orders, isLoading } = useQueryHook(["orders", page], getData);

  const columns = [
    {
      name: "post",
      width: "30%",
      selector: (row) => {
        return (
          <div className="flex items-center gap-2">
            <img
              className="w-[120px] h-[100px] rounded-md"
              src={import.meta.env.VITE_WEBSITE_URL + row.post_image}
              alt=""
            />
            <div className="flex flex-col gap-1">
              <span>
                <span className="font-semibold"> post title: </span>
                <span className="text-secondary-text">{row.post_title}</span>
              </span>
              <span>
                <span className="font-semibold"> post deadline: </span>
                <span className="text-secondary-text">
                  {row.post_dead_line}
                </span>
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
              <span className="font-semibold"> customer name: </span>
              <span className="text-secondary-text">{row.buyer_name}</span>
            </span>
            <span>
              <span className="font-semibold"> customer email: </span>
              <span className="text-secondary-text">{row.buyer_email}</span>
            </span>
            <span>
              <span className="font-semibold"> customer phone: </span>
              <span className="text-secondary-text">{row.buyer_phone}</span>
            </span>
            <span>
              <span className="font-semibold"> order deadline: </span>
              <span className="text-secondary-text">{row.dead_line}</span>
            </span>
            <span>
              <span className="font-semibold"> order budget: </span>
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
      width: "15%",
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
      width: "15%",
      name: "order status",
      selector: (row) => {
        return (
          <div
            className={` p-2 rounded-md  ${
              row.status == 0
                ? "bg-blue-500 bg-opacity-30 text-blue-300"
                : row.status == 1
                ? "bg-green-500 bg-opacity-30 text-green-300"
                : "bg-red-500 bg-opacity-30 text-red-300"
            }
          `}
          >
            {row.status == 0
              ? "pending"
              : row.status == 1
              ? "accepted"
              : "denied"}
          </div>
        );
      },
    },
  ];
  if (isLoading) return <Loader />;
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
          noDataMessage={"no incoming orders to show!"}
        />
      </div>
    </Page>
  );
};

export default ServiceProviderOrders;
