import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/plan/update/${data.planId}`,
    data.formData
  );
  return res;
};
export const EditSubscription = ({
  data,
  PLANSTYPES,
  setIsModalOpen,
  PAYMENTS_CURRENCY,
}) => {
  const [image, setImage] = useState(data?.image);

  let template = {
    title: "add new subscription plan",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[125px] h-[125px]",
      },
      {
        title: "name",
        name: "name",
        type: "text",
        value: data?.name,
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
        value: data?.interval,
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
        value: data?.price,
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
        value: data?.currency,
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
        value: data?.interval_count,
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

  const mutation = useMutationHook(postData, ["subscriptiona"]);
  const onSubmit = async (values) => {
    const id = toast.loading("submitting, please wait...");
    const plan = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", plan.name);
    formData.append("amount", plan.amount);
    formData.append("currency", plan.currency);
    formData.append("interval", plan.interval);
    formData.append("interval_count", plan.interval_count);
    if (/^image/.test(image?.type)) {
      formData.append("image", plan.image);
    }
    const planId = data.id;
    try {
      const res = await mutation.mutateAsync({ formData, planId });
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
