import { toast } from "react-toastify";
import axiosClient from "../../../../../axios-client";
import ReusableForm from "../../../../../Components/ReusableForm";
import { useState } from "react";

export const EditAdmin = ({ data, getAdmins, setIsModalOpen, roles }) => {
  const [image, setImage] = useState(data?.image);
  console.log(data);
  let template = {
    title: "edit  admin details",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[100px] h-[100px]",
      },
      {
        title: "name",
        name: "name",
        type: "text",
        value: data.name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
      },
      {
        title: "username",
        name: "username",
        type: "text",
        value: data.username,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
      },
      {
        title: "email",
        name: "email",
        value: data.email,
        type: "email",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "lg:w-[100%]",
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
        value: data.role,
        optionValue: "name",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role_id[0].name);
    if (typeof values?.image !== "string") {
      formData.append("image", values.image);
    }
    axiosClient
      .post("/admin/profile/update", formData)
      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          getAdmins();
          setIsModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(id, {
            type: "error",
            render: res.data.message,
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

  const validate = () => {};

  return (
    <>
      <ReusableForm
        template={template}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"edit"}
        addedStyles={"md:w-[400px] lg:w-[500px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
