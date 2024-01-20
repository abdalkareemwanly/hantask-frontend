import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/taxe/store", formData);
  return res;
};
export const AddTax = ({ getTax, setIsAddModalOpen, countries }) => {
  let template = {
    title: "add new category",
    fields: [
      {
        title: "tax amount",
        name: "tax",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
      {
        title: "choose a country",
        name: "country_id",
        type: "select",
        options: [...countries],
        optionValue: "id",
        optionText: "country",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["taxes"]);
  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const tax = {
      ...values,
    };
    const formData = new FormData();
    formData.append("tax", tax.tax);
    formData.append("country_id", tax.country_id);
    try {
      const country = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: country.mes,
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
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[400px] lg:w-[400px]"}
      />
    </>
  );
};
