import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";

export const AddProduct = ({ category, setIsAddModalOpen }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  let template = {
    title: "add new product",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center justify-center",
        fileFor: "image",
        imgStyle: "w-[150px] h-[150px]",
      },
      {
        title: "name",
        name: "name",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "type",
        name: "type",
        type: "select",
        options: [{ name: "SERVICE" }, { name: "PRODUCT" }],
        styles: "md:w-[45%]",
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "description",
        name: "description",
        type: "textArea",
        styles: "md:w-[45%]",
      },
      {
        title: "category",
        name: "category",
        type: "select",
        options: Object.entries(category).map(([value, text]) => ({
          value,
          text,
        })),
        styles: "md:w-[45%]",
        optionValue: "value",
        optionText: "text",
      },
      {
        title: "image_url",
        name: "image_url",
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "home_url",
        name: "home_url",
        type: "text",
        styles: "md:w-[45%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    setLoading(true);
    const id = toast.loading("please wait...");

    const formData = new FormData();
    formData.append("category", values.category[0].value);
    formData.append("description", values.description);
    formData.append("image", image);
    formData.append("name", values.name);
    formData.append("type", values.type[0].name);
    axiosClient
      .post("/admin/paypal/products/create", formData)
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          toast.update(id, {
            type: "error",
            render: response.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          // getProduct();
          setIsAddModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: response.data.mes,
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
    // console.log(watchValues);
  };

  return (
    <>
      <ReusableForm
        template={template}
        watchFields={["name", "description"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"add"}
        addedStyles={"md:w-[800px]"}
        image={image}
        setImage={setImage}
        loading={loading}
      />
    </>
  );
};
