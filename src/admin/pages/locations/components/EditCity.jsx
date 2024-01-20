import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/city/update/${data?.cityId}`,
    data.formData
  );
  return res;
};
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
  const mutation = useMutationHook(postData, ["cities"]);
  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const city = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_city", city.city);
    formData.append("country_id", city.country_id);
    try {
      const cityId = data?.id;

      const city = await mutation.mutateAsync({ cityId, formData });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: city.mes,
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
