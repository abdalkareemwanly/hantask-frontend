import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/country/update/${data.countryId}`,
    data.formData
  );
  return res;
};
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
  const mutation = useMutationHook(postData, ["countries"]);

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const country = {
      ...values,
    };
    const formData = new FormData();

    formData.append("country", country.name.toLowerCase());
    const countryId = data?.id;
    try {
      const countryData = await mutation.mutateAsync({ formData, countryId });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: countryData.mes,
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
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};
