import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";

export const AddCity = ({ getCities, setIsAddModalOpen, countries }) => {
  let template = {
    title: "add new category",
    fields: [
      {
        title: "city name",
        name: "city",
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
        title: "choose the country",
        name: "country_id",
        type: "select",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        options: [...countries],
        optionText: "country",
        optionValue: "id",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const country = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_city", country.city);
    formData.append("country_id", country.country_id);
    axiosClient
      .post("/admin/city/store", formData)
      .then((data) => {
        if (data.data.success == false) {
          toast.update(id, {
            type: "error",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getCities();
          setIsAddModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: data.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "success",
          render: err.response.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
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
