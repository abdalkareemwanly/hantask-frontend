import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";

export const EditCategory = ({ data, getCategories, setIsModalOpen }) => {
  const [image, setImage] = useState(data?.image);

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
        title: "category name",
        name: "name",
        type: "text",
        value: data.name,

        styles: "md:w-[45%]",
      },
      {
        title: "description",
        name: "description",
        type: "text",
        value: data.description,

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
        title: "code",
        name: "code",
        type: "text",
        value: data.slug,

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
    if (/^image/.test(image?.type)) {
      formData.append("image", category.image);
    }
    // formData.append("icon", category.icon);
    // formData.append("mobile_icon", category.mobile_icon);
    axiosClient
      .post(`/admin/category/update/${data.id}`, formData)
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
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[800px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
