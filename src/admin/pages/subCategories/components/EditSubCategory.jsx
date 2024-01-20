import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/subCategory/update/${data.catId}`,
    data.formData
  );
  return res;
};
export const EditSubCategory = ({
  data,
  getSubCategories,
  setIsModalOpen,
  categories,
}) => {
  console.log(data.image);
  const [image, setImage] = useState(data.image);
  let mainCategory = categories.find((obj) => obj.name === data.categoryName);

  let template = {
    title: "edit sub category info",
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
        options: [...categories],
        value: mainCategory.id,
        optionText: "name",
        optionValue: "id",
        styles: "md:w-[45%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["subCategories"]);
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
    formData.append("category_id", subCategory.category);
    if (/^image/.test(image?.type)) {
      formData.append("image", subCategory.image);
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
