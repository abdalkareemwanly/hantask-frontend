import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";

export const AddCategory = ({ getCategories, setIsAddModalOpen }) => {
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
        title: "category name",
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
        title: "code",
        name: "code",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      // {
      //   title: "icon",
      //   name: "icon",
      //   type: "file",
      //   fileFor: "icon",
      //   styles: "md:w-[45%] mt-2",
      // },
      // {
      //   title: "mobile icon",
      //   name: "mobile_icon",
      //   type: "file",
      //   fileFor: "icon",
      //   styles: "md:w-[45%] mt-2",
      // },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const category = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("slug", category.slug);
    // formData.append("code", category.code);
    formData.append("image", category.image);
    // formData.append("icon", category.icon);
    // formData.append("mobile_icon", category.mobile_icon);
    axiosClient
      .post("/admin/category/store", formData)
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
          getCategories();
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
