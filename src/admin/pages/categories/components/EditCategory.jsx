import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";

export const EditCategory = ({ data, getCategories, setIsModalOpen }) => {
  const [image, setImage] = useState(data?.image);

  let template = {
    title: "update user data",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[150px] h-[150px]",
      },
      {
        title: "fullname",
        name: "name",
        value: data?.name,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "email",
        name: "email",
        value: data?.email,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "username",
        name: "username",
        value: data?.username,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "phone",
        name: "phone",
        value: data?.phone,
        type: "text",
        styles: "md:w-[45%]",
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

    formData.append("name", user.name);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    if (typeof user?.image !== "string") {
      formData.append("image", user.image);
    }
    axiosClient
      .post(`/admin/user/update/${data?.id}`, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.update(id, {
            type: "error",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getCategories();
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
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "error",
          render: err,
          closeOnClick: true,
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
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
