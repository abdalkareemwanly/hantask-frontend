import { useState } from "react";
import axiosClient from "../../../axios-client";
import { useMutationHook } from "../../../hooks/useMutationHook";
import { useQueryHook } from "../../../hooks/useQueryHook";
import PageTitle from "../../../Components/PageTitle";
import TableData from "../../../Components/TableData";
import { Page } from "../../../Components/StyledComponents";
import Button from "../../../Components/Button";
import ModalContainer from "../../../Components/ModalContainer";
import { formatMoney } from "../../../functions/price";
import ChangeStatus from "./components/ChangeStatus";
import ReportModal from "./components/ReportModal";
import { FaEye } from "react-icons/fa6";
import ReviewModal from "./components/ReviewModal";
import Loader from "../../../Components/Loader";
import Edit from "../reviews/components/Edit";
import EditReview from "./components/EditReview";
const getData = async () => {
  const res = await axiosClient.get("/buyer/acceptedComments");
  return res;
};

const acceptOrderFun = async ({ id, status }) => {
  const res = await axiosClient.get(
    `/buyer/comment/changeStatusMethod/${id}?status=${status}`
  );
  return res;
};

const AcceptedOrders = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState("");
  const [clickedRow, setClickedRow] = useState();
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [editReviewModal, setEditReviewModal] = useState(false);
  const {
    data: orders,
    errors,
    isLoading,
    refetch,
  } = useQueryHook(["acceptedOrders", page], getData);

  const changeStatusMutation = useMutationHook(acceptOrderFun, [
    "acceptedOrders",
    page,
  ]);

  const handleSelectedRow = (row) => {
    setClickedRow(row);
    setIsChangeModalOpen(true);
  };

  const handleSelectedRowReport = (row) => {
    setClickedRow(row);
    setReportModalOpen(true);
  };
  const handleselectedRowReview = (row) => {
    setClickedRow(row);
    setReviewModal(true);
  };
  const handleSelectedRowEditReview = (row) => {
    setClickedRow(row);
    setEditReviewModal(true);
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
              Icon={<FaEye />}
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
      width: "11%",
      name: "status",
      selector: (row) => {
        return (
          <div
            className={`p-1 rounded-md ${
              row.work_status == 1
                ? "border border-blueColor text-blueColor bg-blueColor bg-opacity-20"
                : row.work_status == 2
                ? "border border-orangeColor text-orangeColor bg-orangeColor bg-opacity-20"
                : row.work_status == 3
                ? "border border-greenColor text-greenColor bg-greenColor bg-opacity-20"
                : "border border-redColor text-redColor bg-redColor bg-opacity-20 "
            }`}
          >
            {row.work_status == 1
              ? "in proccess"
              : row.work_status == 2
              ? "in progress"
              : row.work_status == 3
              ? "completed"
              : "canceled"}
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
            {row.work_status == 0 ||
            row.work_status == 1 ||
            row.work_status == 2 ? (
              <Button
                isLink={false}
                color={"bg-blueColor"}
                title={"change status"}
                onClickFun={() => handleSelectedRow(row)}
              />
            ) : row.data_review === false ? (
              <Button
                isLink={false}
                color={"bg-blueColor"}
                title={"add review"}
                onClickFun={() => handleselectedRowReview(row)}
              />
            ) : (
              <Button
                isLink={false}
                color={"bg-blueColor"}
                title={"edit review"}
                onClickFun={() => handleSelectedRowEditReview(row)}
              />
            )}
            <Button
              isLink={false}
              color={"bg-redColor"}
              title={"report"}
              onClickFun={() => handleSelectedRowReport(row)}
            />
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
      {isChangeModalOpen && (
        <ModalContainer
          isModalOpen={isChangeModalOpen}
          setIsModalOpen={setIsChangeModalOpen}
          component={
            <ChangeStatus
              data={clickedRow}
              setIsModalOpen={setIsChangeModalOpen}
            />
          }
        />
      )}
      {reportModalOpen && (
        <ModalContainer
          isModalOpen={reportModalOpen}
          setIsModalOpen={setReportModalOpen}
          component={
            <ReportModal
              order={clickedRow}
              setIsModalOpen={setReportModalOpen}
            />
          }
        />
      )}
      {reviewModal && (
        <ModalContainer
          isModalOpen={reviewModal}
          setIsModalOpen={setReviewModal}
          component={
            <ReviewModal order={clickedRow} setIsModalOpen={setReviewModal} />
          }
        />
      )}
      {editReviewModal && (
        <ModalContainer
          isModalOpen={editReviewModal}
          setIsModalOpen={setEditReviewModal}
          component={
            <EditReview
              order={clickedRow}
              setIsModalOpen={setEditReviewModal}
            />
          }
        />
      )}
      <PageTitle text={"all accepted orders"} />
      <div className="my-4">
        <TableData
          columns={columns}
          enableSearch={false}
          response={orders}
          actualData={orders?.data.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no accepted orders to show!"}
        />
      </div>
    </Page>
  );
};

export default AcceptedOrders;
