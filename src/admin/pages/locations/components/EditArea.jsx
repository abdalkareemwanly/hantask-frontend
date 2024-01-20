import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";

const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/area/update/${data?.areaId}`,
    data.formData
  );
  return res;
};
export const EditArea = ({
  data,
  getAreas,
  setIsModalOpen,
  countries,
  cities,
}) => {
  let country = countries.find((obj) => obj.country === data?.country);
  let city = cities.find((obj) => obj.service_city === data?.city);

  const [filteredCities, setFilteredCities] = useState([city]);

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
        value: country?.id,
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
        value: city.id,
        options: [...filteredCities],
        optionText: "service_city",
        optionValue: "id",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["areas"]);
  const onSubmit = async (values) => {
    console.log(values);
    const id = toast.loading("please wait...");
    const city = {
      ...values,
    };
    const formData = new FormData();

    formData.append("service_area", city.service_area);
    formData.append("country_id", city.country_id);
    formData.append("service_city_id", city.service_city_id);
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
