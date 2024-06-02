import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/child/update/${data.catId}`,
    data.formData
  );
  return res;
};
export const EditChildCategory = ({ data, setIsModalOpen }) => {
  const [image, setImage] = useState(data?.image);
  const { categories, setSelectedCategory, filteredSubCategories } =
    useGlobalDataContext();

  let template = {
    title: "add new category",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[125px] h-[125px]",
      },
      {
        title: "sub category name",
        name: "name",
        value: data.name,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "description",
        name: "description",
        value: data.description,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "slug",
        name: "slug",
        value: data.slug,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "choose the main category",
        name: "category",
        type: "select",
        options: categories,
        optionText: "name",
        searchKey: "name",
        value: data?.category_id,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        onFieldChange: (option, setValue, setSelectedOptions, selectIndex) => {
          setSelectedCategory({ id: option });
          setValue && setValue("subCategory", null);
          setSelectedOptions &&
            setSelectedOptions((prev) =>
              prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
            );
        },
        styles: "md:w-[45%]",
      },
      {
        title: "choose sub category",
        name: "subCategory",
        type: "select",
        options: filteredSubCategories,
        optionText: "name",
        searchKey: "name",
        value: data?.subcategory_id,
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["childCategories"]);

  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const subCategory = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", subCategory.name);
    formData.append("description", subCategory.description);
    formData.append("slug", subCategory.slug);
    formData.append("category_id", subCategory.category[0].id);
    formData.append("sub_category_id", subCategory.subCategory[0].id);
    if (/^image/.test(image?.type)) {
      formData.append("image", subCategory.image);
    }
    const catId = data.id;
    try {
      const user = await mutation.mutateAsync({ formData, catId });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: user.data.mes,
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
    <ReusableForm
      template={template}
      watchFields={["username", "fullname"]}
      onSubmit={onSubmit}
      validate={validate}
      formType={"edit"}
      btnWidth={"w-full text-white"}
      btnText={"submit"}
      addedStyles={"md:w-[800px]"}
      image={image}
      setImage={setImage}
    />
  );
};
