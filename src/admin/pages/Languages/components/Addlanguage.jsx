import { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import axiosClient from "../../../../axios-client";
import { BiX } from "react-icons/bi";
import ReusableForm from "../../../../Components/ReusableForm";
import { toast } from "react-toastify";

export default function Addlanguage(props) {
  const { getAllLanguages, langs } = props;

  const handleSubmit = (values) => {
    const id = toast.loading("Please wait...");

    let language;
    langs.map((ele) => {
      if (ele.code === values.language) {
        language = ele.lanName;
      }
    });

    const formData = {
      default: 0,
      direction: values.direction,
      name: language,
      slug: values.slug,
      status: values.status,
    };
    axiosClient.post("/admin/language/store", formData).then(() => {
      axiosClient
        .post("/admin/translation/store", { slug: formData.slug })
        .then((response) => {
          getAllLanguages();
          toast.update(id, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
            closeOnClick: true,
          });
        });
    });
  };

  let template = {
    title: "add new language",
    fields: [
      {
        title: "language",
        name: "language",
        type: "select",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [...langs],
        optionValue: "code",
        optionText: "lanName",
      },
      {
        title: "Direction",
        name: "direction",
        type: "select",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "LTR" }, { name: "RTL" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "status",
        name: "status",
        type: "select",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        options: [{ name: "publish" }, { name: "draft" }],
        optionValue: "name",
        optionText: "name",
      },
      {
        title: "slug",
        name: "slug",
        type: "text",
        readOnly: true,
      },
    ],
  };

  const validate = (watchedValues, methods) => {
    const { errors, setError, clearErrors, setValue, resetField } = methods;

    if (watchedValues?.language !== "") {
      setValue("slug", watchedValues?.language);
    } else {
      resetField("slug");
    }
  };

  return (
    <>
      <ReusableForm
        template={template}
        btnText={"add new language"}
        btnWidth={"w-[200px]  "}
        watchFields={["language"]}
        validate={validate}
        onSubmit={handleSubmit}
        addedStyles={"w-full"}
      />
    </>
  );
}
