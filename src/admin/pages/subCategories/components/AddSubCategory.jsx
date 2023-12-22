import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";

export const AddSubCategory = ({
  getSubCategories,
  setIsAddModalOpen,
  categories,
}) => {
  const [image, setImage] = useState();

  let template = {
    title: "add new category",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[125px] h-[125px]",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "sub category name",
        name: "name",
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
        title: "description",
        name: "description",
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
        title: "choose the main category",
        name: "category",
        type: "select",
        options: [...categories],
        optionText: "name",
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

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const subCategory = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", subCategory.name);
    formData.append("description", subCategory.description);
    formData.append("slug", subCategory.slug);
    // formData.append("code", category.code);
    formData.append("image", subCategory.image);
    formData.append("category_id", subCategory.category);
    // formData.append("icon", category.icon);
    // formData.append("mobile_icon", category.mobile_icon);
    axiosClient
      .post("/admin/subCategory/store", formData)
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
          getSubCategories();
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
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[600px] lg:w-[600px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
