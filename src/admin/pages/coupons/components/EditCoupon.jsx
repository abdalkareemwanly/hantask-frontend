import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/plan/coupon/update/${data.couponId}`,
    data.formData
  );
  return res;
};
export const EditCoupon = ({ data, plans, setIsModalOpen }) => {
  let template = {
    title: "add new coupon",
    fields: [
      {
        title: "coupon name",
        name: "name",
        type: "text",
        value: data.name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "amount off",
        name: "amount_off",
        value: data.amount,
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "choose plan",
        name: "plan_id",
        value: data.plan_id,
        type: "select",
        options: plans,
        optionText: "name",
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "expire date",
        name: "expire_date",
        value: data.expire_date,
        type: "date",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["coupons"]);
  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("slug", values.slug);
    const couponId = data.id;
    try {
      const res = await mutation.mutateAsync({ formData, couponId });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(id, {
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

  return (
    <>
      <ReusableForm
        template={template}
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[800px]"}
      />
    </>
  );
};
