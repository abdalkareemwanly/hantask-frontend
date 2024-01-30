import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/category/update/${data.catId}`,
    data.formData
  );
  return res;
};
export const EditCoupon = ({ data, getCategories, setIsModalOpen }) => {
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
  const mutation = useMutationHook(postData, ["categories"]);
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
    const catId = data.id;
    // formData.append("icon", category.icon);
    // formData.append("mobile_icon", category.mobile_icon);
    try {
      const user = await mutation.mutateAsync({ formData, catId });
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
