import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useEffect, useState } from "react";

const postData = async (data) => {
  const res = await axiosClient.post(`/buyer/profile/update`, data.formData);
  return res;
};
const EditProfile = ({ data, setIsModalOpen, countries, cities, areas }) => {
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
        title: "username",
        name: "username",
        value: data?.username,
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
        title: "phone",
        name: "phone",
        value: data?.phone,
        type: "text",
        styles: "md:w-[45%]",
      },
      {
        title: "country",
        name: "country",
        type: "select",
        options: [...countries],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        value: data.country.id,
        optionText: "country",
        optionValue: "id",
        styles: "md:w-[45%]",
      },
      {
        title: "city",
        name: "city",
        type: "select",
        options: cities && [...cities],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        value: data.city.id,
        optionText: "service_city",
        optionValue: "id",
        styles: "md:w-[45%]",
      },
      {
        title: "area",
        name: "area",
        type: "select",
        options: areas && [...areas],
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        value: data.area.id,
        optionText: "service_area",
        optionValue: "id",
        styles: "md:w-[45%]",
      },
    ],
  };
  const mutation = useMutationHook(postData, ["profile"]);
  let userId = data?.id;
  const onSubmit = async (values) => {
    const user = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("country_id", user.country[0]?.id);
    formData.append("service_city", user.city[0]?.id);
    formData.append("service_area", user.area[0]?.id);
    if (typeof user?.image !== "string") {
      formData.append("image", user.image);
    }
    const id = toast.loading("submitting, please wait...");
    try {
      const res = await mutation.mutateAsync({ formData, userId });
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

export default EditProfile;
