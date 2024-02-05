import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";

const postData = async (formData) => {
  const res = await axiosClient.post("seller/service/store", formData);
  return res;
};

export const AddService = ({ setIsAddModalOpen, sellerId }) => {
  const [image, setImage] = useState();
  const { countries, cities, categories, subCategories, childCategories } =
    useGlobalDataContext();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = categories?.find(
      (obj) => obj.id == e.target.value
    );
    const updatedFilteredSubCategories = subCategories?.filter(
      (obj) => obj.categoryName === selectedMainCategory?.name
    );
    setFilteredSubCategories(updatedFilteredSubCategories);
  };

  const [filteredChilds, setFilteredChilds] = useState([]);
  const handleChangeSubCategories = (e) => {
    const selectedMainCategory = subCategories?.find(
      (obj) => obj.id == e.target.value
    );
    const updatedFilteredSubCategories = childCategories?.filter(
      (obj) => obj.subcategoryName === selectedMainCategory?.name
    );
    setFilteredChilds(updatedFilteredSubCategories);
  };

  const [filteredCities, setFilteredCities] = useState([]);
  const handleCountriesChange = (e) => {
    const selectedCountry = countries?.find((obj) => obj.id == e.target.value);
    const updatedCiteis = cities?.filter(
      (obj) => obj.country === selectedCountry?.country
    );
    setFilteredCities(updatedCiteis);
  };

  let template = {
    title: "add new service",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        validationProps: {
          required: {
            value: true,
            message: "please choose a profile image first",
          },
        },
        imgStyle: "w-[150px] h-[150px] rounded-md",
      },
      {
        title: "title",
        name: "title",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "slug",
        name: "slug",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "category *",
        name: "category",
        type: "select",
        optionValue: "id",
        options: [...categories],
        optionText: "name",
        firstOptionText: "select category",
        validationProps: {
          onChange: handleMainCategoryChange,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "sub category *",
        name: "subCategory",
        type: "select",
        optionValue: "id",
        options: [...filteredSubCategories],
        optionText: "name",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: handleChangeSubCategories,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "child category *",
        name: "childCategory",
        type: "select",
        optionValue: "id",
        options: [...filteredChilds],
        optionText: "name",
        firstOptionText: "select subCategory",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[30%]",
      },
      {
        title: "country *",
        name: "country",
        options: [...countries],
        optionValue: "id",
        optionText: "country",
        type: "select",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: handleCountriesChange,
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "city *",
        name: "city",
        type: "select",
        optionValue: "id",
        options: [...filteredCities],
        optionText: "service_city",
        firstOptionText: "select sub category",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "description",
        name: "description",
        type: "textArea",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["services"]);

  const onSubmit = async (values) => {
    const service = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("title", service.title);
    formData.append("slug", service.slug);
    formData.append("category_id", service.category);
    formData.append("subcategory_id", service.subCategory);
    formData.append("child_category_id", service.childCategory);
    formData.append("service_city_id", service.city);
    // formData.append("country_id", service.country);
    formData.append("status", 1);
    formData.append("description", service.description);
    formData.append("seller_id", sellerId);
    formData.append("image", service.image);

    const id = toast.loading("please wait...");
    try {
      const res = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: res.data.mes,
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

  const validate = () => {};

  return (
    <>
      <ReusableForm
        template={template}
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"add"}
        addedStyles={"md:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
