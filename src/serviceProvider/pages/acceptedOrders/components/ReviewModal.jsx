import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const postData = async ({ data }) => {
  const res = await axiosClient.post(`/seller/review/store`, data);
  return res;
};
const ReviewModal = ({ order, setIsModalOpen }) => {
  const queryClient = useQueryClient();

  const [reviewCount, setReviewCount] = useState(4);
  let template = {
    fields: [
      {
        title: "review description",
        name: "review",
        value: order?.description,
        type: "textArea",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
    ],
  };
  const changeStatusMutation = useMutationHook(postData, ["acceptedOrders"]);

  const onSubmit = async (values) => {
    const toastId = toast.loading("submitting, submitting, please wait...");
    const data = {
      review: reviewCount,
      description: values.review,
      comment_id: order.id,
      recipient_id: order.buyer_id,
    };
    try {
      const res = await changeStatusMutation.mutateAsync({ data });
      setIsModalOpen((prev) => !prev);
      queryClient.invalidateQueries("reviews");
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

  const validate = () => {
    console.log("no");
  };
  const ratingChanged = (newRating) => {
    setReviewCount(newRating);
  };
  return (
    <>
      <h1>add your review</h1>
      <ReactStars
        count={5}
        value={reviewCount}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={" text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};

export default ReviewModal;
