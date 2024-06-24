import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/area/store", formData);
  return res;
};
export const AddArea = ({ setIsAddModalOpen }) => {
  const { countries, filteredCities, setSelectedCountry, setInvalidateAreas } =
    useGlobalDataContext();
  let template = {
    title: "add new city",
    fields: [
      {
        title: "city name",
        name: "service_area",
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
        title: "zip code",
        name: "zip_code",
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
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          console.log(option);
          setSelectedCountry({ id: option });
          setValue && setValue("service_city_id", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        options: [...countries],
        optionText: "country",
        optionValue: "id",
        searchKey: "country",
      },
      {
        title: "choose region",
        name: "service_city_id",
        options: [...filteredCities],
        type: "select",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: "service_city",
        searchKey: "service_city",
        optionValue: "id",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["areas"]);
  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const area = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_area", area.service_area);
    formData.append("country_id", area.country_id[0].id);
    formData.append("service_city_id", area.service_city_id[0].id);
    formData.append("zip_code", area.zip_code);
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
      setInvalidateAreas((prev) => !prev);
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
