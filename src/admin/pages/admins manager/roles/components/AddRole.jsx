import { toast } from "react-toastify";
import axiosClient from "../../../../../axios-client";
import ReusableForm from "../../../../../Components/ReusableForm";

export const AddRole = ({ getRoles, setIsAddModalOpen }) => {
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

    axiosClient
      .post("/admin/role/store", formData)
      .then((data) => {
        if (data.data.success == false) {
          toast.update(id, {
            type: "error",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getRoles();
          setIsAddModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: data.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "success",
          render: err.response.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
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
