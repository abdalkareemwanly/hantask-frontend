import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../axios-client";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/plan/store", formData);
  return res;
};

export const AddSubscription = ({
  setIsAddModalOpen,
  PLANSTYPES,
  PAYMENTS_CURRENCY,
}) => {
  const [image, setImage] = useState();

  let template = {
    title: "add new subscription plan",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[125px] h-[125px]",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
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
        styles: "md:w-[45%]",
      },
      {
        title: "expire time",
        name: "interval",
        type: "select",
        options: PLANSTYPES,
        optionText: "title",
        optionValue: "title",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "price",
        name: "amount",
        type: "number",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "currency",
        name: "currency",
        type: "select",
        options: PAYMENTS_CURRENCY,
        optionText: "title",
        optionValue: "title",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
      {
        title: "interval count",
        name: "interval_count",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[45%]",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["subscriptions"]);

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const category = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("amount", category.amount);
    formData.append("currency", category.currency);
    formData.append("interval", category.interval);
    formData.append("interval_count", category.interval_count);
    // formData.append("code", category.code);
    formData.append("image", category.image);
    // formData.append("icon", category.icon);
    // formData.append("mobile_icon", category.mobile_icon);
    try {
      const category = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: category.mes,
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

  const validate = (watchValues, mehtods) => {
    //watchValues: the inputs name you want to watch and validate the values of them
    //errors: it is an array contains errors recieved from form inputs
    // setError: to set a custom error
    // clear errors: can clean all the errors from the form or specify the error you want to clear [key]
    //setValue: set input value depending on specific thing
    //resetField: if you want to reset the field from the value

    let { errors, setError, clearErrors, setValue, resetField, register } =
      mehtods;
    console.log(watchValues);
    if (watchValues.interval === "month" && watchValues.interval_count > 12) {
      setError("interval_count", {
        type: "manual",
        message: "must be less than 12 ",
      });
    } else if (
      watchValues.interval === "year" &&
      watchValues.interval_count > 5
    ) {
      setError("interval_count", {
        type: "manual",
        message: "must be less than 5 ",
      });
    } else {
      clearErrors("interval_count");
    }
  };

  return (
    <>
      <ReusableForm
        template={template}
        watchFields={["interval", "interval_count"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[600px] lg:w-[600px]"}
        image={image}
        setImage={setImage}
      />
    </>
  );
};
