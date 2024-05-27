import { useState } from "react";
import ModalContainer from "../../../Components/ModalContainer";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import axiosClient from "../../../axios-client";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { FaEye } from "react-icons/fa6";
import Button from "../../../Components/Button";
import Loader from "../../../Components/Loader";
import ReviewModal from "../acceptedOrders/components/ReviewModal";
import Edit from "./components/Edit";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";
const getData = async () => {
  const res = await axiosClient.get("/buyer/reviews");
  return res;
};

const deleteRow = async (id) => {
  const res = await axiosClient.get(`/buyer/review/delete/${id}`);
  return res;
};

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("USER"));
  const [description, setDescription] = useState("");
  const [selectedRow, setSelectedRow] = useState();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const {
    data: reviews,
    errors,
    isLoading,
    isFetching,
    refetch,
    isError,
  } = useQueryHook(["reviews", page], getData);

  const handleUpdateReview = (data) => {
    console.log(data);
    setSelectedRow(data);
    setIsUpdateModalOpen(true);
  };
  const deleteMutation = useMutationHook(deleteRow, ["reviews", page]);

  const deleteFunc = async (id) => {
    const toastId = toast.loading("deleting..");
    try {
      const user = await deleteMutation.mutateAsync(id);
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

  const handleDeleteReview = (data) => {
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
        deleteFunc(data.id);
      }
    });
  };

  const COLUMNS = [
    {
      name: "Order ID",
      width: "13.3%",
      selector: (row) => row.comment_id,
    },
    {
      name: "review ID",
      width: "13.3%",
      selector: (row) => row.id,
    },
    {
      name: "review Details",
      width: "54%",
      cell: (row) => {
        return (
          <div className="flex  items-start gap-8">
            <div className="flex flex-col text-primary-text gap-[5px]">
              <div>
                <strong>review From: </strong>
                {row.review_from.name}
              </div>
              <div>
                <strong>review To: </strong>
                {row.review_to.name}
              </div>

              <div className="flex gap-[3px]">
                <strong>Description: </strong>
                <span
                  onClick={() => {
                    setOpenDescriptionModal(true);
                    setDescription(row.description);
                  }}
                  className="py-[5px] px-[10px] rounded-[6px] flex justify-center items-center bg-greenColor text-primary-text duration-[500ms] cursor-pointer"
                >
                  <FaEye />
                </span>
              </div>
            </div>
            <div className="flex flex-col text-primary-text gap-[5px]">
              <div>
                <strong>review: </strong>
                <ReactStars
                  count={5}
                  value={Number(row.review)}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <div>
                <strong>review Date: </strong>
                {row.created_at.slice(0, 10)}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      name: "actions",
      selector: (row) => {
        return (
          <div className="flex gap-1">
            {row.review_from.email === user.email && (
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={"update"}
                onClickFun={() => handleUpdateReview(row)}
              />
            )}
            <Button
              isLink={false}
              color={"bg-redColor"}
              title={"delete"}
              onClickFun={() => handleDeleteReview(row)}
            />
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loader />;
  if (isError) <NetworkErrorComponent />;
  return isFetching ? (
    <Loader />
  ) : (
    <Page>
      <div className="flex flex-col gap-[30px]">
        <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
          <div className=" flex justify-between border-b border-light-text  pb-[20px]">
            <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
              All reviews
            </h4>
          </div>
          <TableData
            columns={COLUMNS}
            enableSearch={false}
            response={reviews}
            actualData={reviews?.data?.data}
            setPage={setPage}
            paginationBool={true}
            noDataMessage={"no reviews to show!"}
          />
        </div>
      </div>
      {openDescriptionModal && (
        <ModalContainer
          isModalOpen={openDescriptionModal}
          setIsModalOpen={setOpenDescriptionModal}
          component={
            <div className="min-w-[30vw]">
              <div className=" flex justify-between border-b border-light-text  pb-[20px]">
                <h5 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                  review Details
                </h5>
              </div>
              <div className="mt-[20px]">{description}</div>
            </div>
          }
        />
      )}
      {isUpdateModalOpen && (
        <ModalContainer
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
          component={
            <Edit order={selectedRow} setIsModalOpen={setIsUpdateModalOpen} />
          }
        />
      )}
    </Page>
  );
};

export default Reviews;
