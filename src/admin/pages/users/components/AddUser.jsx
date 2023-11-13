import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";

export const AddUser = ({ getUsers, setIsAddModalOpen }) => {
  const [image, setImage] = useState();

  let template = {
    title: "add new user",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        // validationProps: {
        //   required: {
        //     value: true,
        //     message: "please choose a profile image first",
        //   },
        // },
        imgStyle: "w-[150px] h-[150px]",
      },
      {
        title: "fullname",
        name: "name",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "email",
        name: "email",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "username",
        name: "username",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "phone",
        name: "phone",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "password",
        name: "password",
        type: "password",
        styles: "w-[100%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const user = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", user.name),
      formData.append("username", user.username),
      formData.append("email", user.email),
      formData.append("password", user.password),
      formData.append("phone", user.phone),
      formData.append("image", user.image),
      console.log(user, formData);
    axiosClient.post("/admin/user/store", formData).then((data) => {
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
        getUsers();
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
    });
  };

  const validate = (watchValues) => {
    console.log(watchValues);
  };

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
