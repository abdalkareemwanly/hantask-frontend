import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/area/store", formData);
  return res;
};
export const AddArea = ({ getAreas, setIsAddModalOpen, countries, cities }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const handleCountryChange = (e) => {
    const selectedCountry = countries.find((obj) => obj.id == e.target.value);
    const updatedFilteredCities = cities.filter(
      (obj) => obj.country === selectedCountry?.country
    );
    setFilteredCities(updatedFilteredCities);
  };
  let template = {
    title: "add new category",
    fields: [
      {
        title: "area name",
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
        title: "choose the country",
        name: "country_id",
        type: "select",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
          onChange: handleCountryChange,
        },
        options: [...countries],
        optionText: "country",
        optionValue: "id",
      },
      {
        title: "choose city",
        name: "service_city_id",
        type: "select",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        options: [...filteredCities],
        optionText: "service_city",
        optionValue: "id",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["areas"]);
  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const area = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_area", area.service_area);
    formData.append("country_id", area.country_id);
    formData.append("service_city_id", area.service_city_id);
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
