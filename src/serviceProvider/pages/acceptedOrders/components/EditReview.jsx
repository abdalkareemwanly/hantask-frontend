import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const postData = async ({ id, data }) => {
  const res = await axiosClient.post(`/buyer/review/update/${id}`, data);
  return res;
};
const EditReview = ({ order, setIsModalOpen }) => {
  const queryClient = useQueryClient();
  const [reviewCount, setReviewCount] = useState(order.data_review[0].review);
  let template = {
    fields: [
      {
        title: "review description",
        name: "review",
        value: order?.data_review[0].description,
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
    };
    const id = order.data_review[0].id;
    try {
      const res = await changeStatusMutation.mutateAsync({ id, data });
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

export default EditReview;
