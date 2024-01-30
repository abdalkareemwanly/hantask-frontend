import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/child/update/${data.catId}`,
    data.formData
  );
  return res;
};
export const EditChildCategory = ({
  data,
  getChildCategories,
  setIsModalOpen,
  subCategories,
  categories,
}) => {
  const [image, setImage] = useState(data?.image);
  let mainCategory = categories.find((obj) => obj.name === data?.categoryName);
  let subCategory = subCategories.find(
    (obj) => obj.name === data?.subcategoryName
  );
  const [filteredSubCategories, setFilteredSubCategories] = useState([
    subCategory,
  ]);
  // const [mainCategory, setMainCategory] = useState(null);
  console.log(filteredSubCategories);
  const handleMainCategoryChange = (e) => {
    const selectedMainCategory = categories.find(
      (obj) => obj.id == e.target.value
    );
    // setMainCategory(selectedMainCategory);
    const updatedFilteredSubCategories = subCategories.filter(
      (obj) => obj.categoryName === selectedMainCategory?.name
    );
    setFilteredSubCategories(updatedFilteredSubCategories);
  };
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
        options: [...categories],
        value: mainCategory?.id,
        optionText: "name",
        validationProps: {
          onChange: handleMainCategoryChange,
        },
        optionValue: "id",
        styles: "md:w-[45%]",
      },
      {
        title: "choose the main category",
        name: "subCategory",
        type: "select",
        options: [...filteredSubCategories],
        value: subCategory?.id,
        optionText: "name",
        validationProps: {
          required: { value: true, message: "oops, you missed me!" },
        },
        optionValue: "id",
        styles: "md:w-[45%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["childCategories"]);

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
    formData.append("sub_category_id", subCategory.subCategory);
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
