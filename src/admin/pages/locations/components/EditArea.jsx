import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";

const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/area/update/${data?.areaId}`,
    data.formData
  );
  return res;
};
export const EditArea = ({ data, setIsModalOpen }) => {
  const { countries, filteredCities, setSelectedCountry, setInvalidateAreas } =
    useGlobalDataContext();

  let template = {
    title: "edit city details",
    fields: [
      {
        title: "area name",
        name: "service_area",
        type: "text",
        value: data?.service_area,
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
        value: data?.zip_code,
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
        value: data.country_id,
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
        options: countries,
        optionText: "country",
        optionValue: "id",
        searchKey: "country",
      },
      {
        title: "choose city",
        name: "service_city_id",
        options: filteredCities,
        value: data?.city_id,
        type: "select",
        optionText: "service_city",
        searchKey: "service_city",
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
    ],
  };
  const mutation = useMutationHook(postData, ["areas"]);
  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const city = {
      ...values,
    };
    const formData = new FormData();

    formData.append("service_area", city.service_area);
    formData.append("country_id", city.country_id[0].id);
    formData.append("service_city_id", city.service_city_id[0].id);
    formData.append("zip_code", city.zip_code);
    const areaId = data.id;
    try {
      const city = await mutation.mutateAsync({ areaId, formData });
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
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};
