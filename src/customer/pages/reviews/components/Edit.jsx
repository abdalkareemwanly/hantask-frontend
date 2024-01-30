import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";

const postData = async ({ id, data }) => {
  const res = await axiosClient.post(`/buyer/review/update/${id}`, data);
  return res;
};
const Edit = ({ order, setIsModalOpen }) => {
  console.log(order);
  const [reviewCount, setReviewCount] = useState(order.review);
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
  const changeStatusMutation = useMutationHook(postData, ["reviews"]);

  const onSubmit = async (values) => {
    const toastId = toast.loading("loading...");
    const data = {
      review: reviewCount,
      description: values.review,
    };
    const id = order.id;
    try {
      const user = await changeStatusMutation.mutateAsync({ id, data });
      setIsModalOpen((prev) => !prev);
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

export default Edit;
