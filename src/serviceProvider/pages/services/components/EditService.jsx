import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/user/update/${data.userId}`,
    data.formData
  );
  return res;
};
export const EditService = ({ data, setIsModalOpen }) => {
  const [image, setImage] = useState(data?.image);
  const { countries, cities, categories, subCategories, childCategories } =
    useGlobalDataContext();
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = categories?.find((obj) => obj.id == e);
    const updatedFilteredSubCategories = subCategories?.filter(
      (obj) => obj.categoryName === selectedMainCategory?.name
    );
    setFilteredSubCategories(updatedFilteredSubCategories);
  };

  const [filteredChilds, setFilteredChilds] = useState([]);
  const handleChangeSubCategories = (e) => {
    const selectedMainCategory = subCategories?.find((obj) => obj.id == e);
    const updatedFilteredSubCategories = childCategories?.filter(
      (obj) => obj.subcategoryName === selectedMainCategory?.name
    );
    setFilteredChilds(updatedFilteredSubCategories);
  };

  const [filteredCities, setFilteredCities] = useState([]);
  const handleCountriesChange = (e) => {
    const selectedCountry = countries?.find((obj) => obj.id == e);
    const updatedCiteis = cities?.filter(
      (obj) => obj.country === selectedCountry?.country
    );
    setFilteredCities(updatedCiteis);
  };

  useEffect(() => {
    if (countries && cities && categories && subCategories && childCategories) {
      handleMainCategoryChange(data.category_id);
      handleChangeSubCategories(data.subcategory_id);
      handleCountriesChange(data.country_id);
    }
  }, [countries, cities, categories, subCategories, childCategories]);

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
        value: data.title,
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
        value: data.slug,
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
        value: data?.category_id,
        optionText: "name",
        firstOptionText: "select category",
        validationProps: {
          onChange: (e) => handleMainCategoryChange(e.target.value),
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
        options: filteredSubCategories && [...filteredSubCategories],
        value: data?.subcategory_id,
        optionText: "name",
        firstOptionText: "select sub category",
        validationProps: {
          onChange: (e) => handleChangeSubCategories(e.target.value),
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
        value: data?.child_category_id,
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
          onChange: (e) => handleCountriesChange(e.target.value),
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
        options: filteredCities && [...filteredCities],
        value: data.service_city_id,
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
  const mutation = useMutationHook(postData, ["users"]);
  let userId = data?.id;
  const onSubmit = async (values) => {
    const user = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    if (typeof user?.image !== "string") {
      formData.append("image", user.image);
    }
    const id = toast.loading("please wait...");
    try {
      const user = await mutation.mutateAsync({ formData, userId });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: user.mes,
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
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
