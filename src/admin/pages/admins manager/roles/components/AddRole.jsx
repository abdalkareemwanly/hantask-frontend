import { toast } from "react-toastify";
import axiosClient from "../../../../../axios-client";
import ReusableForm from "../../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../../hooks/useMutationHook";
const postRole = async (formData) => {
  const res = await axiosClient.post("/admin/role/store", formData);
  return res;
};
export const AddRole = ({ getRoles, setIsAddModalOpen }) => {
  const mutation = useMutationHook(postRole, ["roles"]);

  let template = {
    title: "add new role",
    fields: [
      {
        title: "role name",
        name: "name",
        type: "text",
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
    try {
      const role = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: role.mes,
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
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full"}
        btnText={"add"}
        addedStyles={"md:w-[400px] lg:w-[400px]"}
      />
    </>
  );
};
