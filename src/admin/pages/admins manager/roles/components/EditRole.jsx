import { toast } from "react-toastify";
import ReusableForm from "../../../../../Components/ReusableForm";
import axiosClient from "../../../../../axios-client";
import { useMutationHook } from "../../../../../hooks/useMutationHook";
const postData = async (data) => {
  const res = await axiosClient.post(
    `/admin/role/update/${data.roleId}`,
    data.formData
  );
  return res;
};
export const EditRole = ({ data, getRoles, setIsModalOpen }) => {
  const mutation = useMutationHook(postData, ["roles"]);

  let template = {
    title: "add new category",
    fields: [
      {
        title: "tax amount",
        name: "name",
        type: "text",
        value: data.name,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const formData = new FormData();
    formData.append("name", values.name);
    const roleId = data.id;
    try {
      const user = await mutation.mutateAsync({ formData, roleId });
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
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};
