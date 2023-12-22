import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";

export const EditCity = ({ data, getCities, setIsModalOpen, countries }) => {
  let country = countries.find((obj) => obj.country === data.country);

  let template = {
    title: "add new category",
    fields: [
      {
        title: "city name",
        name: "city",
        value: data.service_city,
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
        value: country.id,
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
    const city = {
      ...values,
    };
    const formData = new FormData();

    formData.append("service_city", city.city);
    formData.append("country_id", city.country_id);
    axiosClient
      .post(`/admin/city/update/${data?.id}`, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.update(id, {
            type: "error",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getCities();
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
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "error",
          render: err,
          closeOnClick: true,
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
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};
