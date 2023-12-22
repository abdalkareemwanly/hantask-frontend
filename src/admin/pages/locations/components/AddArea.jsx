import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";

export const AddArea = ({ getAreas, setIsAddModalOpen, countries, cities }) => {
  const [filteredCities, setFilteredCities] = useState([]);
  console.log(filteredCities);
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

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const area = {
      ...values,
    };
    const formData = new FormData();
    formData.append("service_area", area.service_area);
    formData.append("country_id", area.country_id);
    formData.append("service_city_id", area.service_city_id);
    axiosClient
      .post("/admin/area/store", formData)
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
          getAreas();
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
