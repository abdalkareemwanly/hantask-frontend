import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/city/update/${data?.cityId}`,
    data.formData
  );
  return res;
};
export const EditCity = ({ data, setIsModalOpen }) => {
  const { countries } = useGlobalDataContext();

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
        searchKey: "country",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        options: [...countries],
        value: data?.country_id,
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
