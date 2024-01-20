import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/user/update/${data.userId}`,
    data.formData
  );
  return res;
};
export const EditUser = ({ data, setIsModalOpen }) => {
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
  const mutation = useMutationHook(postData, ["users"]);
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
    if (typeof user?.image !== "string") {
      formData.append("image", user.image);
    }
    const id = toast.loading("please wait...");
    try {
      const user = await mutation.mutateAsync({ formData, userId });
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
