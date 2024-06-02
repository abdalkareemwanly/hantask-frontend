import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/city/store", formData);
  return res;
};
export const AddCity = ({ setIsAddModalOpen }) => {
  const { countries, setInvalidateCities } = useGlobalDataContext();
  console.log(countries);
  let template = {
    title: "add new region",
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
        searchKey: "country",
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
  const mutation = useMutationHook(postData, ["cities"]);
  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const country = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_city", country.city);
    formData.append("country_id", country.country_id[0].id);
    try {
      const city = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: city.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      setInvalidateCities((prev) => !prev);
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
