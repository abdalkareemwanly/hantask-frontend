import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/country/store", formData);
  return res;
};
export const AddCountry = ({ setIsAddModalOpen, allCountries }) => {
  let template = {
    title: "add new country",
    fields: [
      {
        title: "choose the main category",
        name: "name",
        type: "select",
        options: [...allCountries],
        optionText: "name",
        searchKey: "name",
        // value: mainCategory?.id,
        optionValue: "name",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        // onFieldChange: (option) => setSelectedCategory({ id: option }),
        styles: "md:w-[100%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["countries"]);
  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const country = {
      ...values,
    };
    const formData = new FormData();
    formData.append("country", country.name.toLowerCase());
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
