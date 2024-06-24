import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post(
    "/admin/subscription/coupon/store",
    formData
  );
  return res;
};

export const AddCoupon = ({ plans, setIsAddModalOpen }) => {
  let template = {
    title: "add new coupon",
    fields: [
      {
        title: "coupon name",
        name: "name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-full",
      },
      {
        title: "amount off",
        name: "amount_off",
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "currency",
        name: "currency",
        type: "select",
        options: [{ name: "usd" }, { name: "eur" }],
        optionText: "name",
        optionValue: "name",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "duration",
        name: "duration",
        type: "select",
        options: [{ name: "once" }, { name: "repeating" }, { name: "forever" }],
        optionText: "name",
        optionValue: "name",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "duration_in_months",
        name: "duration_in_months",
        type: "number",
        styles: "md:w-[45%]",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["coupons"]);

  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("amount_off", values.amount_off);
    formData.append("status", values.status);
    formData.append("currency", values.currency[0].name);
    formData.append("duration", values.duration[0].name);
    formData.append("duration_in_months", values.duration_in_months);
    try {
      const res = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
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
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[600px] lg:w-[600px]"}
      />
    </>
  );
};
