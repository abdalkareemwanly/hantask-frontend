import { toast } from "react-toastify";
import axiosClient from "../../../../../axios-client";
import ReusableForm from "../../../../../Components/ReusableForm";
import { useState } from "react";

export const AddAdmin = ({ getAdmins, setIsAddModalOpen, roles }) => {
  const [image, setImage] = useState();

  let template = {
    title: "add admin",
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
        required: { value: true, message: "please set an image first" },
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "name",
        name: "name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "username",
        name: "username",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "email",
        name: "email",
        type: "email",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        title: "password",
        name: "password",
        type: "password",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[48%]",
      },
      {
        name: "role_id",
        title: "select the role",
        type: "select",
        options: [...roles],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        optionText: "name",
        optionValue: "name",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", image);
    formData.append("role", values.role_id);
    axiosClient
      .post("/admin/store", formData)
      .then((data) => {
        console.log(data);
        if (data.success === false) {
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
          getAdmins();
          setIsAddModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          type: "error",
          render: err.response.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
  };

  const validate = () => {};

  return (
    <ReusableForm
      template={template}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"add"}
      addedStyles={"md:w-[400px] lg:w-[800px]"}
      image={image}
      setImage={setImage}
    />
  );
};
