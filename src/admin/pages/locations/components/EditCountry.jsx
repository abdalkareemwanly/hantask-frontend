import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";

export const EditCountry = ({
  data,
  getCountries,
  setIsModalOpen,
  allCountries,
}) => {
  let template = {
    title: "add new category",
    fields: [
      {
        title: "country name",
        name: "name",
        type: "select",
        options: [...allCountries],
        optionText: "name",
        value: data?.country.toLowerCase(),
        optionValue: "name",
        styles: "md:w-[100%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const country = {
      ...values,
    };
    const formData = new FormData();

    formData.append("country", country.name.toLowerCase());
    axiosClient
      .post(`/admin/country/update/${data?.id}`, formData)
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
          getCountries();
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
